import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as fs from "fs";

import { IArticle } from "../../model/orm/interfaces/article.interface";
import { APIService } from "../../common.services/_api.service";
import { IAnswer } from "../../model/answer.interface";
import { ISetting } from "../../model/orm/interfaces/setting.interface";
import { ILang } from "../../model/orm/interfaces/lang.interface";

@Injectable()
export class SitemapService extends APIService {
    constructor (
        @InjectModel("Article") private readonly modelArticle: Model<IArticle>,
        @InjectModel("Setting") private readonly modelSetting: Model<ISetting>,
        @InjectModel("Lang") private readonly modelLang: Model<ILang>,
    ) {
        super();
    }

    public async load(): Promise<IAnswer<string>> {
        try {
            let filename: string = "../static/sitemap.xml"; 

            if (!fs.existsSync (filename)) {
                await this.writeFile(filename, "[just created]");     
            }
            
            let data: string = await this.readFile(filename);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in SitemapService.load: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async save(data: string): Promise<IAnswer<void>> {
        try {
            let filename: string = "../static/sitemap.xml";            
            console.log(data);
            await this.writeFile(filename, data);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SitemapService.save: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async build(): Promise<IAnswer<string>> {
        try {            
            let day: number = new Date().getDate ();
            let month: number = new Date().getMonth () + 1;
            let year: number = new Date().getFullYear ();
            let date: string = `${year}-${this.twoDigits(month)}-${this.twoDigits(day)}`;
            let setting: ISetting = await this.modelSetting.findOne({p: "root"});
            
            if (!setting) {
                return {statusCode: 500, error: "root setting not found"};
            }

            let root: string = setting.v;
            let data: string = 
                `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` + 
                `<url><loc>${root}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>\n`;
            let langs: ILang[] = await this.modelLang.find({active: true});

            for (let lang of langs) {
                // home page
                if (!lang.sluggable) {
                    data += `<url><loc>${root}/${lang.slug}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>\n`;
                }

                data += "\n";
            }

            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in SitemapService.build: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private readFile(filename): Promise<string> {
        return new Promise((resolve, reject) => fs.readFile(filename, "utf8", (err, data) => err ? reject (err.message) : resolve (data)));
    }

    private writeFile(filename, data): Promise<void>  {
        return new Promise((resolve, reject) => fs.writeFile(filename, data, err => err ? reject(err.message) : resolve()));
    }
}
