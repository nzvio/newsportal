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
import { IVote } from "../../model/orm/interfaces/vote.interface";
import { IVoteDTO } from "./dto/vote.dto";
import { IVoteAnswerDTO } from "./dto/vote.answer.dto";
import { IArticleGetDTO } from "./dto/article.get.dto";

@Injectable()
export class ArticlesService extends APIService {
    constructor (
        @InjectModel("Article") private readonly articleModel: Model<IArticle>,
        @InjectModel("Category") private readonly categoryModel: Model<ICategory>,
        @InjectModel("Vote") private readonly voteModel: Model<IVote>,
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
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},                
                
                {$match: filter},
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggreageting, second criteria is required to prevent repeating items with same field values in different chunk
                {$skip: from},
                {$limit: q},                
                
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                
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
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggreageting, second criteria is required to prevent repeating items with same field values in different chunk
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
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggregating, second criteria is required to prevent repeating items with same field values in different chunk
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
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},

                {$match: filter},
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggregating, second criteria is required to prevent repeating items with same field values in different chunk               
                {$skip: from},
                {$limit: q},          

                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$addFields: {__commentsq: {$size: "$comments"}}},                
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: {path: "$user", preserveNullAndEmptyArrays: false}}, // if user not exist, article will still be displayed    
                           
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

    // filter by category, by user, by name, by tag
    public async chunkBy(dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;        
        const projection: any = {name: 1, slug: 1, img: 1, date: 1, contentshort: 1, "category.slug": 1, "category.name": 1, "user._id": 1, "user.name": 1, "user.img_s": 1, viewsq: 1, rating: 1, votesq: 1, tags: 1, __commentsq: 1};               
        const filter: any = this.buildFilter(dto);                

        try {
            const data: ArticleDTO[] = await this.articleModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}}, // join categories before filter to apply "category.active=true" filter
                {$unwind: "$category"},                

                {$match: filter},
                {$sort: {[sortBy]: sortDir, _id: 1}},  // !!IMPORTANT!! When aggregating, second criteria is required to prevent repeating items with same field values in different chunk                             
                {$skip: from},
                {$limit: q},                

                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$addFields: {__commentsq: {$size: "$comments"}}},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: {path: "$user", preserveNullAndEmptyArrays: false}}, // if user not exist, article will still be displayed                
                {$lookup: {from: "tags", localField: "tags", foreignField: "_id", as: "tags"}}, // unwind not needed for array field
                
                {$project: projection},
            ]);            
            const allData: any = await this.articleModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}}, // join categories before filter to apply "category.active=true" filter
                {$match: filter},
                {$count: "fullLength"}
            ]);
            const fullLength: number = allData.length ? allData[0]["fullLength"] : 0;                          
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.chunkBy: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async one(dto: IArticleGetDTO): Promise<IAnswer<ArticleDTO>> {
        const projection: any = {name: 1, img: 1, slug: 1, date: 1, content: 1, h1: 1, title: 1, keywords: 1, description: 1, source: 1, "category.slug": 1, "user._id": 1, "user.name": 1, "user.img_s": 1, viewsq: 1, rating: 1, votesq: 1, tags: 1, __commentsq: 1};               
        const filter: any = {slug: dto.slug, lang: mongoose.Types.ObjectId(dto.lang), active: true, "category.active": true};

        try {
            const data: ArticleDTO[] = await this.articleModel.aggregate([
                {$lookup: {from: "categories", localField: "category", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$match: filter},
                {$lookup: {from: "comments", localField: "_id", foreignField: "article", as: "comments"}},
                {$addFields: {__commentsq: {$size: "$comments"}}},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: {path: "$user", preserveNullAndEmptyArrays: false}}, // if user not exist, article will still be displayed                
                {$lookup: {from: "tags", localField: "tags", foreignField: "_id", as: "tags"}}, // unwind not needed for array field
                {$project: projection},
            ]);
            return data.length ? {statusCode: 200, data: data[0]} : {statusCode: 404, error: "article not found"};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private buildFilter(dto: ArticlesGetchunkDTO): any {
        let filter: any = {lang: mongoose.Types.ObjectId(dto.filterLang), active: true};
        
        if (!this.isEmpty(dto.filterCategory)) {
            filter["category._id"] = mongoose.Types.ObjectId(dto.filterCategory);
        }

        if (!this.isEmpty(dto.filterUser)) {
            filter["user"] = mongoose.Types.ObjectId(dto.filterUser);
            filter["category.active"] = true;
        }

        if (!this.isEmpty(dto.filterName)) {
            filter["name"] = {$regex: '.*'+dto.filterName+'.*', $options: "i"};
            filter["category.active"] = true;
        }

        if (!this.isEmpty(dto.filterTag)) {
            filter["tags"] = {$elemMatch: {$eq: mongoose.Types.ObjectId(dto.filterTag)}};
            filter["category.active"] = true;
        }

        if (dto.filterLoadedAt != 0) {
            filter.created_at = {$lt: new Date(dto.filterLoadedAt)};
        }

        if (dto.filterExcludeId) {
            filter["_id"] = {$ne: mongoose.Types.ObjectId(dto.filterExcludeId)};
        }
        
        return filter;
    }

    public async vote(dto: IVoteDTO): Promise<IAnswer<IVoteAnswerDTO>> {
        try {
            let votes: IVote[] = await this.voteModel.find({article: dto.articleId, user: dto.userId});

            if (votes.length) {
                return {statusCode: 409, error: "already voted"};
            }

            let article: IArticle = await this.articleModel.findById(dto.articleId);

            if (!article) {
                return {statusCode: 404, error: "article not found"};
            } 

            article.rating += dto.rating;
            article.votesq++;
            await article.save();
            let vote: IVote = new this.voteModel();
            vote.article = dto.articleId;
            vote.user = dto.userId;
            await vote.save();

            return {statusCode: 200, data: {rating: article.rating, votesq: article.votesq}};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.vote: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async increaseViewsq(_id: string): Promise<IAnswer<void>> {
        try {
            const article: IArticle = await this.articleModel.findById(_id);

            if (!article) {
                return {statusCode: 404, error: "article not found"};
            }

            article.viewsq++;
            await article.save();

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ArticlesService.increaseViews: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
