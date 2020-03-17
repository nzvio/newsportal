import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { APIService } from "../../services/_api.service";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IAnswer } from "../../model/answer.interface";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";
import { ArticleDTO } from "./dto/article.dto";
import { ICategory } from "../../model/orm/interfaces/category.interface";

@Injectable()
export class ArticlesService extends APIService {
    constructor (
        @InjectModel("Article") private readonly articleModel: Model<IArticle>,
        @InjectModel("Category") private readonly categoryModel: Model<ICategory>,
    ) {
        super();
    }

    public async top(dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 6;
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, "category.slug": 1, "category.name": 1, __commentsq: {$size: "$comments"}};
        const filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), active: true, top: true, "category.active": true};

        try {            
            const data: ArticleDTO[] = await this.articleModel.aggregate([
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},                
                {$match: filter},
                {$sort: {[sortBy]: sortDir}},
                {$skip: from},
                {$limit: q},                
                {$project: projection},                
            ]);            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.top: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async main(dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 6;
        const options: any = {skip: from, limit: q, sort: {[sortBy]: sortDir}};
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, "category.slug": 1, "category.name": 1};                 

        try {
            let categories: ICategory[] = await this.categoryModel.find({$or: [{parent: null}, {parent: {$exists: false}}], active: 1});

            if (categories.length) {
                let data: IArticle[] = [];

                for (let category of categories) {
                    const filter: Object = {lang: dto.filterLang, active: true, main: true, category: category._id};                    
                    const categoryArticles: IArticle[] = await this.articleModel
                        .find(filter, projection, options)
                        .populate("category");
                    data = data.concat(categoryArticles);
                }

                return {statusCode: 200, data};
            } else {
                return {statusCode: 500, error: "no active categories found"};
            }
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.main: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async popular(dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 4;        
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, "category.name": 1, "category.slug": 1, contentshort: 1};         
        const filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), active: true, popular: true, "category.active": true};

        try {            
            const data: IArticle[] = await this.articleModel.aggregate([
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},                
                {$match: filter},
                {$sort: {[sortBy]: sortDir}},
                {$skip: from},
                {$limit: q},                
                {$project: projection},
            ]);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.popular: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async recommended(dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 3;        
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, "category.name": 1, "category.slug": 1};         
        const filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), active: true, recommended: true, "category.active": true};

        try {            
            const data: IArticle[] = await this.articleModel.aggregate([
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},                
                {$match: filter},
                {$sort: {[sortBy]: sortDir}},
                {$skip: from},
                {$limit: q},                
                {$project: projection},
            ]);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.recommended: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;        
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, "category.name": 1, "category.slug": 1, "user._id": 1, "user.name": 1, "user.img_s": 1, viewsq: 1, __commentsq: 1};               
        const filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), active: true, "category.active": true};

        try {            
            const data: ArticleDTO[] = await this.articleModel.aggregate([
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$addFields: {__commentsq: {$size: "$comments"}}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: {path: "$user", preserveNullAndEmptyArrays: false}}, // if user not exist, article will still be displayed
                {$match: filter},
                {$sort: {[sortBy]: sortDir}},                
                {$skip: from},
                {$limit: q},                
                {$project: projection},                
            ]);     
            const allData: any = await this.articleModel.aggregate([
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$match: filter},
                {$count: "fullLength"}
            ]);            
            const fullLength: number = allData.length ? allData[0]["fullLength"] : 0;  
            return {statusCode: 200, data, fullLength};        
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunkByCategory(dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;        
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, contentshort: 1, "category.slug": 1, "category.name": 1, "user._id": 1, "user.name": 1, "user.img_s": 1, viewsq: 1, rating: 1, votesq: 1, tags: 1, __commentsq: 1};               
        let filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), category: mongoose.Types.ObjectId(dto.filterCategory), active: true};
        dto.filterLoadedAt ? filter.created_at = {$lt: new Date(dto.filterLoadedAt)} : null; // dont include articles that arrived after first chunk loading        

        try {
            const data: ArticleDTO[] = await this.articleModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                {$match: filter},
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$addFields: {__commentsq: {$size: "$comments"}}},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: {path: "$user", preserveNullAndEmptyArrays: false}}, // if user not exist, article will still be displayed
                {$lookup: {from: "tags", localField: "tags", foreignField: "_id", as: "tags"}}, // unwind not needed for array field                
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}}, // notice: join categories must be after filter, because filter uses article.category as category._id
                {$unwind: "$category"},                
                {$sort: {[sortBy]: sortDir}},                
                {$skip: from},
                {$limit: q},                
                {$project: projection},
            ]);            
            const allData: any = await this.articleModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                {$match: filter},
                {$count: "fullLength"}
            ]);
            const fullLength: number = allData.length ? allData[0]["fullLength"] : 0;              
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.chunkByCategory: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    /*
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
}
