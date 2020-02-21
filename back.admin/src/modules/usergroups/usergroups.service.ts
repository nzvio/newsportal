import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IUsergroup } from "./interfaces/usergroup.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { UsergroupGetallDTO } from "./dto/usergroup.getall.dto";
import { UsergroupGetchunkDTO } from "./dto/usergroup.getchunk.dto";
import { APIService } from "../api.service";

@Injectable()
export class UsergroupsService extends APIService {
    constructor (@InjectModel("Usergroup") private readonly model: Model<IUsergroup>) {
        super();
    }

    public async all(dto: UsergroupGetallDTO): Promise<IAnswer<IUsergroup[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            return {
                status: 200,                 
                data: await this.model.find ({}, null, {sort: {[sortBy]: sortDir}})
            };
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.all: ${String(err)}`;
            console.log(errTxt);

            return {status: 500, error: errTxt};
        }
    }

    public async chunk(dto: UsergroupGetchunkDTO): Promise<IAnswer<IUsergroup[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: IUsergroup[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();

            return {
                status: 200,
                data: data,
                fullLength: fullLength
            };
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.chunk: ${String(err)}`;
            console.log(errTxt);

            return {status: 500, error: errTxt};
        }
    } 
    
    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {status: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.delete: ${String(err)}`;
            console.log(errTxt);

            return {status: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {status: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);

            return {status: 500, error: errTxt};
        }
    }
}
