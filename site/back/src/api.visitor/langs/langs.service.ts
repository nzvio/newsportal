import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ILang } from "../../model/orm/interfaces/lang.interface";
import { GetallDTO } from "../../model/dto/getall.dto";
import { IAnswer } from "../../model/answer.interface";
import { APIService } from "../../services/_api.service";

@Injectable()
export class LangsService extends APIService {
    constructor (@InjectModel("Lang") private readonly model: Model<ILang>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<ILang[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "pos";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: ILang[] = await this.model.find ({active: true}, null, {sort: {[sortBy]: sortDir}}); // when getting all, phrases not needed
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
