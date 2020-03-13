import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { ICategory } from "../../model/orm/interfaces/category.interface";
import { GetallDTO } from "../../model/dto/getall.dto";
import { IAnswer } from "../../model/answer.interface";
import { CategoryDTO } from "./dto/category.dto";

@Injectable()
export class CategoriesService extends APIService {
    constructor (@InjectModel("Category") private readonly model: Model<ICategory>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<CategoryDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "pos";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            // first level
            let data: ICategory[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}], active: true}, null, {sort: {[sortBy]: sortDir}}); 
            let categories: CategoryDTO[] = data.length ? data.map(d => d.toObject()) : [];
            
            // children
            for (let category of categories) {
                category.__children = await this.buildChildren(category, sortBy, sortDir, null);
            }                        
            
            return {statusCode: 200, data: categories};
        } catch (err) {
            let errTxt: string = `Error in CategoriesService.all: ${String(err)}`;
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
