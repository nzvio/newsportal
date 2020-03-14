import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ISetting } from "../../model/orm/interfaces/setting.interface";
import { IAnswer } from "../../model/answer.interface";
import { APIService } from "../../services/_api.service";

@Injectable()
export class SettingsService extends APIService {
    constructor (@InjectModel("Setting") private readonly model: Model<ISetting>) {
        super();
    }

    public async all(): Promise<IAnswer<ISetting[]>> {
        const projection: Object = {c: 0, pos: 0};

        try {
            let data: ISetting[] = await this.model.find ({}, projection);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
