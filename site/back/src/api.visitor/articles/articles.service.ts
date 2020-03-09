import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { IArticle } from "../../interfaces/model/article.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";

@Injectable()
export class ArticlesService extends APIService {
    constructor (@InjectModel("Article") private readonly model: Model<IArticle>) {
        super();
    }

    public async top(dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 6;
        const filterLang: string = dto.filterLang !== undefined ? dto.filterLang : "any";         
        let filter: any = this.buildFilter(null, null, "any", filterLang);
        filter.active = true;
        filter.top = true;        
        const projection: Object = {content: 0, contentshort: 0, h1: 0, title: 0, keywords: 0, description: 0, img_s: 0};

        try {            
            let data: IArticle[] = await this.model.find(filter, projection, {skip: from, limit: q, sort: {[sortBy]: sortDir}}).populate("category");            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.top: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    /*public async chunk(dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;
        let filterDate: string | null = dto.filterDate !== undefined ? dto.filterDate : null; // can be null in DTO!
        let filterName: string = !this.isEmpty(dto.q) ? dto.filterName : "";
        let filterCategory: string = dto.filterCategory !== undefined ? dto.filterCategory : "any"; // can be null in DTO!
        let filterLang: string = dto.filterLang !== undefined ? dto.filterLang : "any"; // can be null in DTO!
        let filter: Object = this.buildFilter(filterDate, filterName, filterCategory, filterLang);          

        try {            
            const projection: Object = {content: 0, contentshort: 0, h1: 0, title: 0, keywords: 0, description: 0, img: 0, img_s:0, slug: 0, source: 0};
            let data: IArticle[] = await this.model.find(filter, projection, {skip: from, limit: q, sort: {[sortBy]: sortDir}});            
            let fullLength: number = await this.model.countDocuments(filter);
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<IArticle>> {
        try {
            let data: IArticle = await this.model.findById(_id);            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
    */

    private buildFilter(filterDate: string | null, filterName: string, filterCategory: string, filterLang: string): Object {
        let request: any = {};

        if (filterCategory != "any") {
            request.category = filterCategory;
        }

        if (filterLang != "any") {
            request.lang = filterLang;
        }

        if (filterName) {
            request.name = {$regex: '.*'+filterName+'.*', $options: "i"};
        }

        if (filterDate) {
            let startDate: Date = new Date(filterDate);
            let endDate: Date = new Date(filterDate);
            endDate.setDate(endDate.getDate() + 1);
            request.date = {"$gte": startDate, "$lt": endDate};
        }

        return request;
    }
}
