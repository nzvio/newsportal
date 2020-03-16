import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { IComment } from "../../model/orm/interfaces/comment.interface";
import { APIService } from "../../services/_api.service";
import { CommentsGetchunkDTO } from "./dto/comments.getchunk.dto";
import { IAnswer } from "../../model/answer.interface";

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
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}},                
                {$unwind: "$user"},                
                {$match: filter},                
                {$sort: {[sortBy]: sortDir}}, 
                {$skip: from},
                {$limit: q},                
                {$project: projection}                
            ]);
            const allData: any = await this.commentModel.aggregate([
                {$lookup: {from: "articles", localField: "article", foreignField: "_id", as: "article"}},                
                {$lookup: {from: "categories", localField: "article.category", foreignField: "_id", as: "article.category"}},                    
                {$lookup: {from: "users", localField: "user", foreignField: "_id", as: "user"}}, 
                {$unwind: "$user"}, // to preserve not existing, because this operation uses "preserveNullAndEmptyArrays" by default
                {$match: filter},
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
}
