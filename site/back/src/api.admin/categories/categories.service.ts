import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { ICategory } from "../../interfaces/model/category.interface";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { CategoryCreateDTO } from "./dto/category.create.dto";
import { CategoryUpdateDTO } from "./dto/category.update.dto";
import { CategoryDTO } from "./dto/category.dto";

@Injectable()
export class CategoriesService extends APIService {
    constructor (@InjectModel("Category") private readonly model: Model<ICategory>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<CategoryDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            // first level
            let data: ICategory[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}]}, {name: 1}, {sort: {[sortBy]: sortDir}}); 
            let categories: CategoryDTO[] = data.length ? data.map(d => d.toObject()) : [];
            
            // children
            for (let category of categories) {
                category.__children = await this.buildChildren(category, sortBy, sortDir, {name: 1});
            }                        
            
            return {statusCode: 200, data: categories};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<CategoryDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "title";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            // first level
            let data: ICategory[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}]}, {}, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let categories: CategoryDTO[] = data.length ? data.map(d => d.toObject()) : [];
            let fullLength: number = await this.model.countDocuments();
            
            // children
            for (let category of categories) {
                category.__children = await this.buildChildren(category, sortBy, sortDir);
            } 

            return {statusCode: 200, data: categories, fullLength};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<ICategory>> {
        try {
            let data: ICategory = await this.model.findById(_id);            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: CategoryCreateDTO): Promise<IAnswer<void>> {        
        try {
            dto.slug = await this.checkSlug(this.model, dto.slug, null, 0);
            const x: ICategory = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: CategoryUpdateDTO): Promise<IAnswer<void>> {
        try {            
            dto.slug = await this.checkSlug(this.model, dto.slug, dto._id, 0);
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    private async buildChildren(category: CategoryDTO, sortBy: string, sortDir: number, projection: Object | null = null): Promise<CategoryDTO[]> {
        let data: ICategory[] = await this.model.find({parent: category._id}, projection, {sort: {[sortBy]: sortDir}});
        let children: CategoryDTO[] = data.length ? data.map(d => d.toObject()) : [];

        for (let child of children) {
            child.__children = await this.buildChildren(child, sortBy, sortDir, projection);
        }

        return children;
    }    
}
