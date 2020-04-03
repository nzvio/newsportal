import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../common.services/_api.service";
import { IPage } from "../../model/orm/interfaces/page.interface";
import { GetallDTO } from "../../model/dto/getall.dto";
import { IAnswer } from "../../model/answer.interface";
import { PageDTO } from "./dto/page.dto";

@Injectable()
export class PagesService extends APIService {
    constructor (@InjectModel("Page") private readonly model: Model<IPage>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<PageDTO[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "pos";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            // first level
            let data: IPage[] = await this.model.find({$or: [{parent: null}, {parent: {$exists: false}}], active: true}, null, {sort: {[sortBy]: sortDir}}); 
            let pages: PageDTO[] = data.length ? data.map(d => d.toObject()) : [];
            
            // children
            for (let page of pages) {
                page.__children = await this.buildChildren(page, sortBy, sortDir, null);
            }                        
            
            return {statusCode: 200, data: pages};
        } catch (err) {
            let errTxt: string = `Error in PagesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    

    private async buildChildren(page: PageDTO, sortBy: string, sortDir: number, projection: Object | null = null): Promise<PageDTO[]> {
        let data: IPage[] = await this.model.find({parent: page._id, active: true}, projection, {sort: {[sortBy]: sortDir}});
        let children: PageDTO[] = data.length ? data.map(d => d.toObject()) : [];

        for (let child of children) {
            child.__children = await this.buildChildren(child, sortBy, sortDir, projection);
        }

        return children;
    }    
}
