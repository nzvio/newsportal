import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { ISetting } from "../../model/orm/interfaces/setting.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { SettingCreateDTO } from "./dto/setting.create.dto";

@Injectable()
export class SettingsService extends APIService {
    constructor (@InjectModel("Setting") private readonly model: Model<ISetting>) {
        super();
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<ISetting[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "pos";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: ISetting[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: SettingCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: ISetting = new this.model(dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
}
