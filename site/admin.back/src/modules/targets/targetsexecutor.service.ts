import { Injectable, HttpService } from "@nestjs/common";
import { Socket, Server } from 'socket.io';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as xml2js from "xml2js";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as sharp from 'sharp';

import { ITarget } from "./interfaces/target.interface";
import { IArticle } from "../articles/interfaces/article.interface";
import { IDonor } from "../donors/interfaces/donor.interface";
import { SlugService } from "../../services/slug.service";
import { IImagable } from "../../interfaces/imagable.interface";

@Injectable()
export class TargetsExecutorService {
    constructor(
        @InjectModel("Target") private readonly targetModel: Model<ITarget>,
        @InjectModel("Article") private readonly articleModel: Model<IArticle>,
        private readonly httpService: HttpService,
        private readonly slugService: SlugService,
    ) {}

    public async executeOne(_id: string, socket: Socket | Server | null = null): Promise<void> {
        try {
            this.monitorLog(socket, "targetExecuting", `finding target by _id=${_id}...`);
            const target: ITarget = await this.targetModel.findById(_id).populate("donor");
    
            if (!target) {
                this.monitorLog(socket, "targetExecuted", `target not found`, true);                
                return;
            }

            this.monitorLog(socket, "targetExecuting", `target found`);

            if (!target.rss) {
                this.monitorLog(socket, "targetExecuted", `no rss in target`, true);                
                return;
            }
                
            this.monitorLog(socket, "targetExecuting", `getting RSS XML...`);
            const xml: string = await this.requestPage(target.rss);
            
            if (!xml) {
                this.monitorLog(socket, "targetExecuted", `no XML received`, true);                
                return;
            }

            this.monitorLog(socket, "targetExecuting", `RSS XML received`);
            this.monitorLog(socket, "targetExecuting", `Parsing XML...`);
            const xmlParser: xml2js.Parser = new xml2js.Parser();
            const xmlObj: any = await xmlParser.parseStringPromise(xml);
            this.monitorLog(socket, "targetExecuting", `XML parsed`);
            const items: any[] = xmlObj['rss']['channel'][0]['item'];

            if (!items.length) {
                this.monitorLog(socket, "targetExecuted", `no items in XML`, true);                
                return;
            }

            this.monitorLog(socket, "targetExecuting", `${items.length} items found in XML`);
            
            for (let item of items) {
                let article: IArticle = new this.articleModel();
                article.name = String(item['title']).trim();
                article.date = new Date(item['pubDate']);
                article.source = String(item['link']).trim();
                this.monitorLog(socket, "targetExecuting", `finding article: ${article.name}...`);
                const res: IArticle | null = await this.articleModel.findOne({name: article.name});                

                if (res) {
                    this.monitorLog(socket, "targetExecuting", `article already exists, skipping`, true);
                } else {
                    this.monitorLog(socket, "targetExecuting", `article is new, requesting link ${article.source}...`);
                    const html: string = await this.requestPage(article.source);
                    
                    if (!html) {
                        this.monitorLog(socket, "targetExecuting", `no HTML received`, true);
                    } else {
                        this.monitorLog(socket, "targetExecuting", `HTML received, parsing...`);
                        let $ = cheerio.load(html);
                        const textElements: Cheerio = $((target.donor as IDonor).selector_content);
                    
                        if (!textElements.length) {
                            this.monitorLog(socket, "targetExecuting", `selector not found`, true);
                        } else {
                            this.monitorLog(socket, "targetExecuting", `building article content...`);
                            article.content = "";                            

                            for (let i: number = 0; i < textElements.length; i++) {
                                article.content += `<p>${$(textElements[i]).html()}</p>`;
                            }

                            article.contentshort = String($(textElements[0]).text()).substr(0, 300);

                            if (!article.content) {
                                this.monitorLog(socket, "targetExecuting", `content not found`, true);
                            } else if (!article.contentshort) {
                                this.monitorLog(socket, "targetExecuting", `contentshort not found`, true);
                            } else {                                
                                this.monitorLog(socket, "targetExecuting", `content built, searching image in HTML...`);
                                const imgElements: Cheerio = $((target.donor as IDonor).selector_img);

                                if (!imgElements.length) {
                                    this.monitorLog(socket, "targetExecuting", `image element not found`, true);
                                } else {
                                    let imgSrc: string = $(imgElements[0]).attr('src');
                                    
                                    if (imgSrc.indexOf("http:") === -1 && imgSrc.indexOf("https:") === -1) { // src without host
                                        const urlParts: string[] = article.source.split("/");
                                        const imgHost: string = urlParts[0] + "//" + urlParts[2] + "/";
                                        imgSrc = imgHost + imgSrc;
                                    }

                                    this.monitorLog(socket, "targetExecuting", `image found, getting ${imgSrc}...`);
                                    const images: IImagable = await this.requestImage(imgSrc);
                                    article.img = images.img;
                                    article.img_s = images.img_s;
                                    this.monitorLog(socket, "targetExecuting", `image saved to ${article.img}, copy saved to ${article.img_s}`);
                                }


                                article.category = target.category;
                                article.lang = target.lang;
                                article.slug = this.slugService.buildSlug(article.name);
                                await article.save();
                                this.monitorLog(socket, "targetExecuting", `article saved`);
                            }
                        }
                    }
                }
            }
            
            this.monitorLog(socket, "targetExecuted", `job finished`);
        } catch (err) {
            this.monitorLog(socket, "targetExecuted", err.toString(), true);            
        }        
    }

    private monitorLog(socket: Socket | Server | null, event: string, msg: string, isError: boolean = false) {        
        if (socket) {
            if (!isError) {
                socket.emit(event, {statusCode: 200, data: msg});
            } else {
                socket.emit(event, {statusCode: 500, error: msg});
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
}
