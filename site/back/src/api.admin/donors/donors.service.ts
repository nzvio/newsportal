import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IDonor } from "../../interfaces/model/donor.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetallDTO } from "../../dto/getall.dto";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { APIService } from "../../services/_api.service";
import { DonorCreateDTO } from "./dto/donor.create.dto";
import { DonorUpdateDTO } from "./dto/donor.update.dto";

@Injectable()
export class DonorsService extends APIService {
    constructor (@InjectModel("Donor") private readonly model: Model<IDonor>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<IDonor[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: IDonor[] = await this.model.find ({}, {name: 1}, {sort: {[sortBy]: sortDir}}); // load only names
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: GetchunkDTO): Promise<IAnswer<IDonor[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: IDonor[] = await this.model.find({}, {encoding: 0, selector_content: 0, selector_img: 0}, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public async one(_id: string): Promise<IAnswer<IDonor>> {
        try {
            let data: IDonor = await this.model.findById(_id);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: DonorCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: IDonor = new this.model (dto);                    
            await x.save ();        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: DonorUpdateDTO): Promise<IAnswer<void>> {
        try {
            let _id: string = dto._id;
            await this.model.updateOne ({_id: _id}, dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in DonorsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }    
}
