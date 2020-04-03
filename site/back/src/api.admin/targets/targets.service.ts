import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ITarget } from "../../model/orm/interfaces/target.interface";
import { IAnswer } from "../../model/answer.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { APIService } from "../../common.services/_api.service";
import { TargetCreateDTO } from "./dto/target.create.dto";
import { TargetUpdateDTO } from "./dto/target.update.dto";

@Injectable()
export class TargetsService extends APIService {
    constructor (@InjectModel("Target") protected readonly model: Model<ITarget>) {
        super();
    }    

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<ITarget[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "donor";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: ITarget[] = await this.model.find({}, null, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();            
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public async one(_id: string): Promise<IAnswer<ITarget>> {
        try {
            let data: ITarget = await this.model.findById(_id);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: TargetCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: ITarget = new this.model (dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: TargetUpdateDTO): Promise<IAnswer<void>> {
        try {
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in TargetsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }    
}
