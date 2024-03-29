import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { APIService } from "../../common.services/_api.service";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { UserCreateDTO } from "./dto/user.create.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";
import { GetallDTO } from "../../model/dto/getall.dto";

@Injectable()
export class UsersService extends APIService {
    constructor (@InjectModel("User") private readonly model: Model<IUser>) {
        super();
    }

    public async all(dto: GetallDTO): Promise<IAnswer<IUser[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;

        try {
            let data: IUser[] = await this.model.find ({}, {name: 1}, {sort: {[sortBy]: sortDir}}); // load only titles
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UsersService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async chunk(dto: GetchunkDTO): Promise<IAnswer<IUser[]>> {
        let sortBy: string = !this.isEmpty(dto.sortBy) ? dto.sortBy : "name";
        let sortDir: number = !this.isEmpty(dto.sortDir) ? dto.sortDir : 1;
        let from: number = !this.isEmpty(dto.from) ? dto.from : 0;
        let q: number = !this.isEmpty(dto.q) ? dto.q : 10;

        try {
            let data: IUser[] = await this.model.find({}, {password: 0}, {skip: from, limit: q, sort: {[sortBy]: sortDir}});
            let fullLength: number = await this.model.countDocuments();
            return {statusCode: 200, data, fullLength};
        } catch (err) {
            let errTxt: string = `Error in UsersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(_id: string): Promise<IAnswer<IUser>> {
        try {
            let data: IUser = await this.model.findById(_id, {password: 0});            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UsersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(_id: string): Promise<IAnswer<void>> {
        try {
            await this.model.findByIdAndRemove(_id);        
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        try {
            await this.model.deleteMany({_id: {$in: _ids}});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async create(dto: UserCreateDTO): Promise<IAnswer<void>> {        
        try {
            const x: IUser = new this.model(dto);
            
            if (x.password) {                
                x.password = bcrypt.hashSync(x.password, 10);
            }
            
            await x.save ();
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }   
    
    public async update(dto: UserUpdateDTO): Promise<IAnswer<void>> {
        try {
            let _id: string = dto._id;

            if (dto.password) {                
                dto.password = bcrypt.hashSync(dto.password, 10);
            } else {
                delete dto.password; // if we got empty or null password, then it will not change in DB
            }

            await this.model.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    // for auth service
    public async oneByEmail(email: string): Promise<IUser | undefined> {
        return this.model.findOne({email: email});
    }    
}
