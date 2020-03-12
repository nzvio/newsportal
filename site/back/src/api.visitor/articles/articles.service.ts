import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { APIService } from "../../services/_api.service";
import { IArticle } from "../../interfaces/model/article.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";
import { ArticleDTO } from "./dto/article.dto";
import { ICategory } from "../../interfaces/model/category.interface";

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
        const projection: Object = {name: 1, slug: 1, img: 1, date: 1, category: 1, __commentsq: {$size: "$comments"}};

        try {            
            let data: ArticleDTO[] = await this.articleModel.aggregate([
                {$match: {lang: mongoose.Types.ObjectId(dto.filterLang), active: true, top: true}},
                {$skip: from},
                {$limit: q},
                {$sort: {[sortBy]: sortDir}},                
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
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
        const options: Object = {skip: from, limit: q, sort: {[sortBy]: sortDir}};
        const projection: Object = {name: 1, slug: 1, img: 1, date: 1, category: 1};                 

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
        const options: Object = {skip: from, limit: q, sort: {[sortBy]: sortDir}};
        const projection: Object = {name: 1, slug: 1, img: 1, date: 1, category: 1, contentshort: 1}; 
        const filter: Object = {lang: dto.filterLang, active: true, popular: true};
        
        try {            
            const data: IArticle[] = await this.articleModel
                .find(filter, projection, options)
                .populate("category");
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.popular: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;        
        const projection: Object = {name: 1, slug: 1, img: 1, date: 1, category: 1, user: 1, viewsq: 1, __commentsq: {$size: "$comments"}};               

        try {            
            let data: ArticleDTO[] = await this.articleModel.aggregate([
                {$match: {lang: mongoose.Types.ObjectId(dto.filterLang), active: true}},
                {$skip: from},
                {$limit: q},
                {$sort: {[sortBy]: sortDir}},                
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},
                {$unwind: "$category"},
                {$unwind: "$user"},
                {$project: projection},                
            ]);     
            let fullLength: number = await this.articleModel.countDocuments({lang: dto.filterLang, active: true});
            return {statusCode: 200, data, fullLength};        
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.chunk: ${String(err)}`;
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
