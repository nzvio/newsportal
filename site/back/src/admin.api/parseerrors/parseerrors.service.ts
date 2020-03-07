import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IParseerror } from "../../interfaces/model/parseerror.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { AdminAPIService } from "../_admin.api.service";

@Injectable()
export class ParseerrorsService extends AdminAPIService {
    constructor (@InjectModel("Parseerror") private readonly model: Model<IParseerror>) {
        super();
    }    

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<IParseerror[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "date";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : -1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: IParseerror[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}}).populate({path: "target", populate: "donor"});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in ParseerrorsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }   
    
    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ParseerrorsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ParseerrorsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
