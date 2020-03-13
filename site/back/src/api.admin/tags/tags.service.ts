import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { ITag } from "../../model/orm/interfaces/tag.interface";
import { IAnswer } from "../../model/answer.interface";
import { TagCreateDTO } from "./dto/tag.create.dto";
import { TagUpdateDTO } from "./dto/tag.update.dto";
import { GetallDTO } from "../../model/dto/getall.dto";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";

@Injectable()
export class TagsService extends APIService {
    constructor (@InjectModel("Tag") private readonly model: Model<ITag>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<ITag[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: ITag[] = await this.model.find ({}, null, {sort: {[sortBy]: sortDir}}); 
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TagsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<ITag[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;        
        
        try {            
            let data: ITag[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});            
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in TagsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<ITag>> {
        try {
            let data: ITag = await this.model.findById(_id);            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TagsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TagsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TagsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: TagCreateDTO): Promise<IAnswer<void>> {        
        try {            
            const x: ITag = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TagsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: TagUpdateDTO): Promise<IAnswer<void>> {
        try {            
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TagsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
}
