import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';
import { Server } from 'socket.io';

import { IComment } from "../../model/orm/interfaces/comment.interface";
import { APIService } from "../../services/_api.service";
import { CommentsGetchunkDTO } from "./dto/comments.getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { CommentCreateDTO } from "./dto/comment.create.dto";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { IArticle } from "../../model/orm/interfaces/article.interface";

@Injectable()
export class CommentsService extends APIService {
    constructor (@InjectModel("Comment") private readonly commentModel: Model<IComment>) {
        super();
    }  

    public async chunk(dto: CommentsGetchunkDTO): Promise<IAnswer<IComment[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;   
        const projection: any = {date: 1, "user._id": 1, "user.name": 1, "user.img_s": 1, content: 1, "article.slug": 1, "article.category.slug": 1};
        const filter: any = {active: true, "article.active": true, "article.category.active": true, "article.lang": mongoose.Types.ObjectId(dto.filterLang)};

        try {            
            const data: IComment[] = await this.commentModel.aggregate([
                {$lookup: {from: "articles", localField: "article", foreignField: "_id", as: "article"}},
                {$unwind: "$article"},                
                {$lookup: {from: "categories", localField: "article.category", foreignField: "_id", as: "article.category"}},
                {$unwind: "$article.category"},
                
                {$match: filter},                
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggregating, second criteria is required to prevent repeating items with same field values in different chunk                             
                {$skip: from},
                {$limit: q},                

                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: "$user"},                
                
                {$project: projection}                
            ]);
            const allData: any = await this.commentModel.aggregate([
                {$lookup: {from: "articles", localField: "article", foreignField: "_id", as: "article"}},                
                {$lookup: {from: "categories", localField: "article.category", foreignField: "_id", as: "article.category"}},                    
                {$match: filter},

                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}}, 
                {$unwind: "$user"}, // to preserve not existing, because this operation uses "preserveNullAndEmptyArrays" by default
                
                {$count: "fullLength"}
            ]);            
            const fullLength: number = allData.length ? allData[0]["fullLength"] : 0;              
            return {statusCode: 200, data, fullLength};        
        } catch (err) {
            let errTxt: string = `Error in CommentsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async chunkByArticle(dto: CommentsGetchunkDTO): Promise<IAnswer<IComment[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        const from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        const q: number = !this.isEmpty(dto.q) ? dto.q : 10;   
        const projection: any = {date: 1, "user._id": 1, "user.name": 1, "user.img_s": 1, content: 1, likes: 1, dislikes: 1};
        const filter: any = {active: true, article: mongoose.Types.ObjectId(dto.filterArticle)};
        dto.filterLoadedAt ? filter.created_at = {$lt: new Date(dto.filterLoadedAt)} : null;

        try {
            const data: IComment[] = await this.commentModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                
                {$match: filter},                
                {$sort: {[sortBy]: sortDir, _id: 1}}, // !!IMPORTANT!! When aggregating, second criteria is required to prevent repeating items with same field values in different chunk                             
                {$skip: from},
                {$limit: q},                

                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: "$user"},                
                
                {$project: projection}                
            ]);
            const allData: any = await this.commentModel.aggregate([
                {$addFields: {created_at: {$toDate: "$_id"}}},
                {$match: filter},
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}}, 
                {$unwind: "$user"}, // to preserve not existing, because this operation uses "preserveNullAndEmptyArrays" by default                
                {$count: "fullLength"}
            ]);
            const fullLength: number = allData.length ? allData[0]["fullLength"] : 0;   
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in CommentsService.chunkByArticle: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(socket: Server, dto: CommentCreateDTO): Promise<IAnswer<void>> {
        try {
            const x: IComment = new this.commentModel(dto);
            await x.save();
            const filter: any = {_id: mongoose.Types.ObjectId(x._id)};
            const projection: any = {date: 1, "user._id": 1, "user.name": 1, "user.img_s": 1, content: 1, "article.slug": 1, "article.category.slug": 1, "article.lang": 1};
            const data: IComment[] = await this.commentModel.aggregate([                
                {$match: filter},
                
                {$lookup: {from: "articles", localField: "article", foreignField: "_id", as: "article"}},
                {$unwind: "$article"},                
                {$lookup: {from: "categories", localField: "article.category", foreignField: "_id", as: "article.category"}},
                {$unwind: "$article.category"},                
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: "$user"},

                {$project: projection}                
            ]);
            socket.emit("comment-created", {statusCode: 200, data: data[0]});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CommentsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
