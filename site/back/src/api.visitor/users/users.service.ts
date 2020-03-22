import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';
import * as bcrypt from "bcrypt";
import * as Nodemailer from "nodemailer";

import { APIService } from "../../services/_api.service";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { IAnswer } from "../../model/answer.interface";
import { UserDTO } from "./dto/user.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";
import { IPreregisterDTO } from "./dto/preregister.dto";
import { IUsercode } from "../../model/orm/interfaces/usercode.interface";
import { ISetting } from "../../model/orm/interfaces/setting.interface";
import { ILang } from "../../model/orm/interfaces/lang.interface";
import { IPhrase } from "../../model/orm/interfaces/phrase.interface";
import { IRegisterDTO } from "./dto/register.dto";
import { IUsergroup } from "../../model/orm/interfaces/usergroup.interface";

@Injectable()
export class UsersService extends APIService {
    constructor (
        @InjectModel("User") private readonly userModel: Model<IUser>,
        @InjectModel("Usercode") private readonly usercodeModel: Model<IUsercode>,
        @InjectModel("Usergroup") private readonly usergroupModel: Model<IUsergroup>,
        @InjectModel("Setting") private readonly settingModel: Model<ISetting>,
        @InjectModel("Lang") private readonly langModel: Model<ILang>,
    ) {
        super();
    }

    public async one(_id: string): Promise<IAnswer<UserDTO>> {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return {statusCode: 404, error: "invalid user id"};
        }
        
        try {
            const projection: any = {name: 1, img: 1, img_s: 1, __commentsq: 1, __articlesq: 1, __createdat: 1, __rating: 1, __votesq: 1};
            const filter: any = {_id: mongoose.Types.ObjectId(_id)};
            const data: UserDTO[] = await this.userModel.aggregate([
                {$match: filter},
                {
                    $lookup: {
                        from: "articles", 
                        let: {userId: "$_id"},
                        // join only active articles!
                        pipeline: [
                            {$match: {$expr: {$and: [{$eq: ["$user", "$$userId"]}, {$eq: ["$active", true]}]}}}
                        ],
                        as: "articles"
                    }
                },                
                {$lookup: {from: "comments", localField: "_id", foreignField: "user", as: "comments"}},                
                {$addFields: {
                    __commentsq: {$size: "$comments"}, 
                    __articlesq: {$size: "$articles"}, 
                    __createdat: {$toDate: "$_id"},                    
                    __rating: {$sum: "$articles.rating"},
                    __votesq: {$sum: "$articles.votesq"},   
                }},
                {$project: projection},
            ]);            
            return data.length ? {statusCode: 200, data: data[0]} : {statusCode: 404, error: "user not found"};            
        } catch (err) {
            let errTxt: string = `Error in UsersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    // for auth service
    public async oneByEmail(email: string): Promise<UserDTO | null> {
        try {            
            const filter: any = {email};    
            const projection: any = {name: 1, email: 1, img: 1, img_s: 1, __commentsq: 1, __articlesq: 1, __createdat: 1, __rating: 1, __votesq: 1, active: 1, password: 1};
            const data: UserDTO[] = await this.userModel.aggregate([
                {$match: filter},
                {
                    $lookup: {
                        from: "articles", 
                        let: {userId: "$_id"},
                        // join only active articles!
                        pipeline: [
                            {$match: {$expr: {$and: [{$eq: ["$user", "$$userId"]}, {$eq: ["$active", true]}]}}}
                        ],
                        as: "articles"
                    }
                },                
                {$lookup: {from: "comments", localField: "_id", foreignField: "user", as: "comments"}},                
                {$addFields: {
                    __commentsq: {$size: "$comments"}, 
                    __articlesq: {$size: "$articles"}, 
                    __createdat: {$toDate: "$_id"},                    
                    __rating: {$sum: "$articles.rating"},
                    __votesq: {$sum: "$articles.votesq"},   
                }},   
                {$project: projection},
            ]);             
            return data.length ? data[0] : null;
        } catch (err) {
            let errTxt: string = `Error in UsersService.oneByEmail: ${String(err)}`;
            console.log(errTxt);
            return null;
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

            await this.userModel.updateOne ({_id: _id}, dto, {runValidators: true});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async preregister(dto: IPreregisterDTO): Promise<IAnswer<void>> {
        try {
            const user: IUser = await this.userModel.findOne({email: dto.email});

            if (user) {
                return {statusCode: 409, error: "email duplication"};
            }

            const lang: ILang = await this.langModel.findById(dto.lang);
            
            if (!lang) {
                return {statusCode: 500, error: "lang not found"};
            }

            let phrase: IPhrase = lang.phrases.find(ph => ph.mark === "verification-subject");

            if (!phrase) {
                return {statusCode: 500, error: "phrase 'verification-subject' not found"};
            }

            const subject: string = phrase.text;

            phrase = lang.phrases.find(ph => ph.mark === "verification-text");

            if (!phrase) {
                return {statusCode: 500, error: "phrase 'verification-text' not found"};
            }

            const code: string = this.getRandom(100000, 999999).toString();
            const html: string = `${phrase.text} ${code}`;
            const email: string = dto.email;            
            await this.mail(email, subject, html);
            let userCode: IUsercode = await this.usercodeModel.findOne({email: dto.email});

            if (userCode) {
                userCode.code = code;                    
            } else {
                userCode = new this.usercodeModel();
                userCode.code = code;
                userCode.email = email;                    
            }

            await userCode.save();                
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.preregister: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async register(dto: IRegisterDTO): Promise<IAnswer<void>> {
        try {
            const usercode: IUsercode = await this.usercodeModel.findOne({email: dto.user.email});

            if (!usercode || usercode.code !== dto.code) {
                return {statusCode: 401, error: "invalid code"};
            }

            const user: IUser = new this.userModel(dto.user);
            
            if (user.password) {                
                user.password = bcrypt.hashSync(user.password, 10);
            }

            const usergroup: IUsergroup = await this.usergroupModel.findOne({name: "default"});

            if (!usergroup) {
                return {statusCode: 500, error: "usergroup not found"};
            }
            
            user.usergroup = usergroup._id;
            await user.save ();
            await usercode.remove();            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UsersService.register: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private mail(email: string, subject: string, html: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                let setting: ISetting;
                setting = await this.settingModel.findOne ({p: "robot-email-login"});
                !setting ? reject("robot-email-login not found") : null;                
                const robotEmailLogin: string = setting.v;
                setting = await this.settingModel.findOne ({p: "robot-email-pw"});
                !setting ? reject("robot-email-pw not found") : null;                
                const robotEmailPw: string = setting.v;
                const transporter: any = Nodemailer.createTransport({service: 'gmail', auth: {user: robotEmailLogin, pass: robotEmailPw}});            
                const mailOptions = {from: robotEmailLogin, to: email, subject, html};
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(`Error in UsersService.mail: ${String(error)}`);
                        reject(String(error));
                    } else {
                        console.log(`Email sent: ${info.response}`);
                        resolve();
                    }
                });
            } catch (err) {
                let errTxt: string = `Error in UsersService.mail: ${String(err)}`;
                console.log(errTxt);
                reject(errTxt);
            }
        });            
    }
}
