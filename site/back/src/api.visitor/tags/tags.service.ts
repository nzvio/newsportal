import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ITag } from "../../model/orm/interfaces/tag.interface";
import { IAnswer } from "../../model/answer.interface";
import { APIService } from "../../services/_api.service";
import { TagsGetallDTO } from "./dto/tags.getall.dto";

@Injectable()
export class TagsService extends APIService {
    constructor (@InjectModel("Tag") private readonly model: Model<ITag>) {
        super();
    }

    public async all(dto: TagsGetallDTO): Promise<IAnswer<ITag[]>> {
        const sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        const sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let filter: any = {active: true};
        dto.filterLang ? filter.lang = dto.filterLang : null;
        const projection: Object = {name: 1, lang: 1};

        try {
            let data: ITag[] = await this.model.find (filter, projection, {sort: {[sortBy]: sortDir}});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TagsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
