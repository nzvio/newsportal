import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { APIService } from "../../services/_api.service";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { IAnswer } from "../../model/answer.interface";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UsersService extends APIService {
    constructor (@InjectModel("User") private readonly model: Model<IUser>) {
        super();
    }

    public async one(_id: string): Promise<IAnswer<UserDTO>> {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return {statusCode: 404, error: "invalid user id"};
        }
        
        try {
            const projection: any = {name: 1, img: 1, img_s: 1, __commentsq: 1, __articlesq: 1, __createdat: 1};
            const filter: any = {_id: mongoose.Types.ObjectId(_id)};
            const data: UserDTO[] = await this.model.aggregate([
                {$match: filter},
                {
                    $lookup: {
                        from: "articles", 
                        let: {userId: "$_id"},
                        // join only active articles!
                        pipeline: [
                            {$match: {$expr: {$and: [{$eq: ["$user", "$$userId"]}, {$eq: ["$active", true]}]}}}
                        ],
                        as: "articles"
                    }
                },                
                {$lookup: {from: "comments", localField: "_id", foreignField: "user", as: "comments"}},                
                {$addFields: {
                    __commentsq: {$size: "$comments"}, 
                    __articlesq: {$size: "$articles"}, 
                    __createdat: {$toDate: "$_id"}
                }},
                {$project: projection},
            ]);            
            return data.length ? {statusCode: 200, data: data[0]} : {statusCode: 404, error: "user not found"};            
        } catch (err) {
            let errTxt: string = `Error in UsersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // for auth service
    public async oneByEmail(email: string): Promise<IUser | undefined> {
        return this.model.findOne({email: email});
    }
}
