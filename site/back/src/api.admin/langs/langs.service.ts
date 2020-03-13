import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { ILang } from "../../model/orm/interfaces/lang.interface";
import { GetallDTO } from "../../model/dto/getall.dto";
import { IAnswer } from "../../model/answer.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { LangCreateDTO } from "./dto/lang.create.dto";
import { LangUpdateDTO } from "./dto/lang.update.dto";

@Injectable()
export class LangsService extends APIService {
    constructor (@InjectModel("Lang") private readonly model: Model<ILang>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<ILang[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: ILang[] = await this.model.find ({}, {phrases: 0}, {sort: {[sortBy]: sortDir}}); // when getting all, phrases not needed
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<ILang[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: ILang[] = await this.model.find({}, {phrases: 0}, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in LangsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<ILang>> {
        try {
            let data: ILang = await this.model.findById(_id);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: LangCreateDTO): Promise<IAnswer<void>> {        
        try {            
            if (dto.sluggable) { // check sluggable first, only one language can be such, so set sluggable to false for all languages
                await this.model.updateMany({}, {$set: {sluggable: false}});
            }
            
            const x: ILang = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: LangUpdateDTO): Promise<IAnswer<void>> {
        try {            
            if (dto.sluggable) {// check sluggable first, only one language can be such, so set sluggable to false for all languages
                await this.model.updateMany({}, {$set: {sluggable: false}});
            }

            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
}
