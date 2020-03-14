import { Injectable, HttpService } from "@nestjs/common";
import { Socket, Server } from 'socket.io';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as xml2js from "xml2js";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as sharp from 'sharp';

import { ITarget } from "../../model/orm/interfaces/target.interface";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IDonor } from "../../model/orm/interfaces/donor.interface";
import { SlugService } from "../../services/slug.service";
import { IImagable } from "../../model/imagable.interface";
import { APIService } from "../../services/_api.service";
import { IParseerror } from "../../model/orm/interfaces/parseerror.interface";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { ITag } from "../../model/orm/interfaces/tag.interface";

@Injectable()
export class TargetsExecutorService extends APIService {
    constructor(
        @InjectModel("Target") private readonly targetModel: Model<ITarget>,
        @InjectModel("Article") private readonly articleModel: Model<IArticle>,
        @InjectModel("Parseerror") private readonly errorModel: Model<IParseerror>,
        @InjectModel("User") private readonly userModel: Model<IUser>,
        @InjectModel("Tag") private readonly tagModel: Model<ITag>,
        private readonly httpService: HttpService,
        private readonly slugService: SlugService,
    ) {
        super();
    }

    public async executeAll(socket: Socket | Server | null = null): Promise<void> {
        try {
            this.monitorLog(socket, "targetExecuting", `finding active targets...`, "info", null);
            const targets: ITarget[] = await this.targetModel.find({active: true}).populate("donor");

            if (!targets.length) {
                this.monitorLog(socket, "targetExecuted", `targets not found`, "error", null);     
            } else {
                this.monitorLog(socket, "targetExecuting", `targets found`, "info", null);

                for (let target of targets) {
                    await this.executeTarget(target, socket);  
                }

                this.monitorLog(socket, "targetExecuted", `----- job finished -----`, "done", null);
            }
        } catch (err) {
            this.monitorLog(socket, "targetExecuted", err.toString(), "error", null);            
        }    
    }

    public async executeOne(_id: string, socket: Socket | Server | null = null): Promise<void> {
        try {
            this.monitorLog(socket, "targetExecuting", `finding target by _id=${_id}...`, "info", null);
            const target: ITarget = await this.targetModel.findById(_id).populate("donor");
    
            if (!target) {
                this.monitorLog(socket, "targetExecuted", `target not found`, "error", _id);
            } else {
                this.monitorLog(socket, "targetExecuting", `target found`, "info", null);
                await this.executeTarget(target, socket);    
                this.monitorLog(socket, "targetExecuted", `----- job finished -----`, "done", null);            
            }            
        } catch (err) {
            this.monitorLog(socket, "targetExecuted", err.toString(), "error", _id);            
        }        
    }

    private async executeTarget(target: ITarget, socket: Socket | Server | null = null): Promise<void> {
        this.monitorLog(socket, "targetExecuting", `----- executing target ${target._id} -----`, "info", null);

        if (!target.rss) {
            this.monitorLog(socket, "targetExecuted", `no rss in target`, "error", target._id);                
            return;
        }
            
        this.monitorLog(socket, "targetExecuting", `loading RSS XML...`, "info", null);
        const xml: string = await this.requestPage(target.rss);
        
        if (!xml) {
            this.monitorLog(socket, "targetExecuted", `no XML received`, "error", target._id);                
            return;
        }

        this.monitorLog(socket, "targetExecuting", `RSS XML received`, "info", null);
        this.monitorLog(socket, "targetExecuting", `parsing XML...`, "info", null);
        const xmlParser: xml2js.Parser = new xml2js.Parser();
        const xmlObj: any = await xmlParser.parseStringPromise(xml);
        this.monitorLog(socket, "targetExecuting", `XML parsed`, "info", null);
        const items: any[] = xmlObj['rss']['channel'][0]['item'];

        if (!items.length) {
            this.monitorLog(socket, "targetExecuted", `no items in XML`, "error", target._id);                
            return;
        }

        this.monitorLog(socket, "targetExecuting", `${items.length} items found in XML`, "info", null);
        
        for (let item of items) {
            let article: IArticle = new this.articleModel();
            article.name = String(item['title']).trim();
            article.date = new Date(item['pubDate']);
            article.source = String(item['link']).trim();
            this.monitorLog(socket, "targetExecuting", `finding article: ${article.name}...`, "info", null);
            const res: IArticle | null = await this.articleModel.findOne({name: article.name});                

            if (res) {
                this.monitorLog(socket, "targetExecuting", `article already exists, skipping`, "warning", target._id);
            } else {
                this.monitorLog(socket, "targetExecuting", `article is new, loading URL ${article.source}...`, "info", null);
                const html: string = await this.requestPage(article.source);
                
                if (!html) {
                    this.monitorLog(socket, "targetExecuting", `no HTML received`, "error", target._id);
                } else {
                    this.monitorLog(socket, "targetExecuting", `HTML received, parsing...`, "info", null);
                    let $ = cheerio.load(html);
                    const textElements: Cheerio = $((target.donor as IDonor).selector_content);
                
                    if (!textElements.length) {
                        this.monitorLog(socket, "targetExecuting", `selector not found`, "error", target._id);
                    } else {
                        this.monitorLog(socket, "targetExecuting", `building article content...`, "info", null);
                        article.content = "";                            

                        for (let i: number = 0; i < textElements.length; i++) {
                            article.content += `<p>${$(textElements[i]).html()}</p>`;
                        }

                        article.contentshort = String($(textElements[0]).text()).substr(0, 300);

                        if (!article.content) {
                            this.monitorLog(socket, "targetExecuting", `content not found`, "error", target._id);
                        } else if (!article.contentshort) {
                            this.monitorLog(socket, "targetExecuting", `contentshort not found`, "error", target._id);
                        } else {                                
                            this.monitorLog(socket, "targetExecuting", `content built, searching image in HTML...`, "info", null);
                            const imgElements: Cheerio = $((target.donor as IDonor).selector_img);

                            if (!imgElements.length) {
                                this.monitorLog(socket, "targetExecuting", `image element not found`, "warning", target._id);
                            } else {
                                let imgSrc: string = $(imgElements[0]).attr('src');
                                
                                if (imgSrc.indexOf("http:") === -1 && imgSrc.indexOf("https:") === -1) { // src without host
                                    const urlParts: string[] = article.source.split("/");
                                    const imgHost: string = urlParts[0] + "//" + urlParts[2] + "/";
                                    imgSrc = imgHost + imgSrc;
                                }

                                this.monitorLog(socket, "targetExecuting", `image found, loading ${imgSrc}...`, "info", null);
                                const images: IImagable = await this.requestImage(imgSrc);
                                article.img = images.img;
                                article.img_s = images.img_s;
                                this.monitorLog(socket, "targetExecuting", `image saved to ${article.img}, copy saved to ${article.img_s}`, "info", null);
                            }


                            article.category = target.category;
                            article.lang = target.lang;
                            article.slug = this.slugService.buildSlug(article.name);
                            const user: IUser = await this.userModel.findOne({defended: true});
                            article.user = user._id;
                            await this.buildTags(article);
                            await article.save();
                            this.monitorLog(socket, "targetExecuting", `article saved`, "info", null);
                        }
                    }
                }
            }
        }

        this.monitorLog(socket, "targetExecuting", `target executed successfully`, "info", null);        
    }

    private monitorLog(socket: Socket | Server | null, event: string, msg: string, status: string, targetId: string | null) {        
        let date: string = this.formatDate(new Date());

        if (socket) {
            switch (status) {
                case "info":
                    socket.emit(event, {statusCode: 102, data: `${date} - ${msg}`});    
                    break;
                case "warning":
                    socket.emit(event, {statusCode: 199, error: `${date} - ${msg}`});                     
                    break;
                case "done":
                    socket.emit(event, {statusCode: 200, data: `${date} - ${msg}`});    
                    break;
                case "error":
                    socket.emit(event, {statusCode: 500, error: `${date} - ${msg}`}); 
                    let error: IParseerror = new this.errorModel();
                    targetId ? error.target = targetId : null;
                    error.message = msg;
                    error.save();   
                    break;
            }            
        } else {
            console.log(msg);
        }        
    }

    private requestPage(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpService.get(url).subscribe(res => {
                if (res.status === 200) {
                    resolve(res.data);
                } else {
                    reject(res.status);
                }
            }, err => {
                reject(err);
            });
        });
    } 
    
    private requestImage(url: string): Promise<IImagable> {
        return new Promise(async (resolve, reject) => {
            const date: Date = new Date();
            const fileExtension: string = url.split(".").pop() || "";
            const imgFileName: string = date.getTime().toString();
            const imgsFileName: string = imgFileName + "_s";
            const imgFileFullName: string = `${imgFileName}.${fileExtension}`;
            const imgsFileFullName: string = `${imgsFileName}.${fileExtension}`;
            const folder: string = `${date.getFullYear()}-${date.getMonth()+1}`;
            const fullFolder: string = `../static/assets/images/articles/${folder}`;            
            !fs.existsSync (fullFolder) ? fs.mkdirSync (fullFolder) : null;            
            const writer: fs.WriteStream = fs.createWriteStream(`${fullFolder}/${imgFileFullName}`);            
            const response: any = await this.httpService.axiosRef({url, method: 'GET', responseType: 'stream'});
            response.data.pipe(writer);
            
            writer.on('finish', async () => {
                await sharp(`${fullFolder}/${imgFileFullName}`).resize(200).toFile(`${fullFolder}/${imgsFileFullName}`);
                const res: IImagable = {img: `${folder}/${imgFileFullName}`, img_s: `${folder}/${imgsFileFullName}`};
                resolve(res);
            });
            
            writer.on('error', reject);            
        });
    }

    private async buildTags(article: IArticle): Promise<void> {
        let articleTags: string[] = [];
        const tags: ITag[] = await this.tagModel.find({lang: article.lang});

        for (let tag of tags) {
            article.name.toLowerCase().includes(tag.name.toLowerCase()) ? articleTags.push(tag._id) : null;
        }

        articleTags.length ? article.tags = articleTags : null;
    }
}
