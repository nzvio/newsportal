import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IComment } from "../../model/orm/interfaces/comment.interface";
import { IAnswer } from "../../model/answer.interface";
import { APIService } from "../../services/_api.service";
import { CommentsGetallbyarticleDTO } from "./dto/comments.getallbyarticle.dto";
import { CommentUpdateDTO } from "./dto/comment.update.dto";

@Injectable()
export class CommentsService extends APIService {
    constructor (@InjectModel("Comment") private readonly model: Model<IComment>) {
        super();
    }

    public async allByArticle(dto: CommentsGetallbyarticleDTO): Promise<IAnswer<IComment[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;

        try {
            let data: IComment[] = await this.model.find ({article: dto.filterArticle}, null, {sort: {[sortBy]: sortDir}}).populate("user");
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CommentsService.allByArticle: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CommentsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }  
    
    public async update(dto: CommentUpdateDTO): Promise<IAnswer<void>> {
        try {
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CommentsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
}
