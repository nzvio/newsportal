import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IUsergroup } from "./interfaces/usergroup.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetallDTO } from "../../dto/getall.dto";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { APIService } from "../api.service";
import { UsergroupCreateDTO } from "./dto/usergroup.create.dto";
import { UsergroupUpdateDTO } from "./dto/usergroup.update.dto";

@Injectable()
export class UsergroupsService extends APIService {
    constructor (@InjectModel("Usergroup") private readonly model: Model<IUsergroup>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<IUsergroup[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: IUsergroup[] = await this.model.find ({}, null, {sort: {[sortBy]: sortDir}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<IUsergroup[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: IUsergroup[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public async one(_id: string): Promise<IAnswer<IUsergroup>> {
        try {
            let data: IUsergroup = await this.model.findById(_id);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: UsergroupCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: IUsergroup = new this.model (dto);                    
            x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: UsergroupUpdateDTO): Promise<IAnswer<void>> {
        try {
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsergroupsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
}
