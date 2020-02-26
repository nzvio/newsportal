import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../api.service";
import { IPage } from "./interfaces/page.interface";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { PageCreateDTO } from "./dto/page.create.dto";
import { PageUpdateDTO } from "./dto/page.update.dto";
import { PageDTO } from "./dto/page.dto";

@Injectable()
export class PagesService extends APIService {
    constructor (@InjectModel("Page") private readonly model: Model<IPage>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<PageDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            // first level
            let data: IPage[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}]}, {name: 1}, {sort: {[sortBy]: sortDir}}); 
            let pages: PageDTO[] = data.length ? data.map(d => d.toObject()) : [];
            
            // children
            for (let page of pages) {
                page.__children = await this.buildChildren(page, sortBy, sortDir, {name: 1});
            }                        
            
            return {statusCode: 200, data: pages};
        } catch (err) {
            let errTxt: string = `Error in PagesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<PageDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            // first level
            let data: IPage[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}]}, {}, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let pages: PageDTO[] = data.length ? data.map(d => d.toObject()) : [];
            let fullLength: number = await this.model.countDocuments();
            
            // children
            for (let page of pages) {
                page.__children = await this.buildChildren(page, sortBy, sortDir);
            } 

            return {statusCode: 200, data: pages, fullLength};
        } catch (err) {
            let errTxt: string = `Error in PagesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<IPage>> {
        try {
            let data: IPage = await this.model.findById(_id);            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in PagesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in PagesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in PagesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: PageCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: IPage = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in PagesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: PageUpdateDTO): Promise<IAnswer<void>> {
        try {            
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in PagesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    private async buildChildren(page: PageDTO, sortBy: string, sortDir: number, projection: Object = {}): Promise<PageDTO[]> {
        let data: IPage[] = await this.model.find({parent: page._id}, projection, {sort: {[sortBy]: sortDir}});
        let children: PageDTO[] = data.length ? data.map(d => d.toObject()) : [];

        for (let child of children) {
            child.__children = await this.buildChildren(child, sortBy, sortDir, projection);
        }

        return children;
    }
}
