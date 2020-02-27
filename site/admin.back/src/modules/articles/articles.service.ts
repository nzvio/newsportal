import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../api.service";
import { IArticle } from "./interfaces/article.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { ArticleCreateDTO } from "./dto/article.create.dto";
import { ArticleUpdateDTO } from "./dto/article.update.dto";

@Injectable()
export class ArticlesService extends APIService {
    constructor (@InjectModel("Article") private readonly model: Model<IArticle>) {
        super();
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<IArticle[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {            
            let data: IArticle[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});            
            let fullLength: number = await this.model.countDocuments();
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

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ArticleCreateDTO): Promise<IAnswer<void>> {        
        try {
            dto.slug = await this.checkSlug(this.model, dto.slug, null, 0);
            const x: IArticle = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: ArticleUpdateDTO): Promise<IAnswer<void>> {
        try {            
            dto.slug = await this.checkSlug(this.model, dto.slug, dto._id, 0);
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
}
