import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../api.service";
import { UpdateParamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { IUsergroup } from "../usergroups/interfaces/usergroup.interface";
import { IUser } from "../users/interfaces/user.interface";
import { ILang } from "../langs/interfaces/lang.interface";
import { IPage } from "../pages/interfaces/page.interface";
import { UpdateEgoisticParamDTO } from "./dto/updateegoisticparam.dto";
import { ICategory } from "../categories/interfaces/category.interface";

@Injectable()
export class ObjectsService extends APIService {
    constructor (
        @InjectModel("Usergroup") private readonly modelUsergroup: Model<IUsergroup>,
        @InjectModel("User") private readonly modelUser: Model<IUser>,
        @InjectModel("Lang") private readonly modelLang: Model<ILang>,
        @InjectModel("Page") private readonly modelPage: Model<IPage>,
        @InjectModel("Category") private readonly modelCategory: Model<ICategory>,
    ) {
        super();
    }

    public async updateParam (dto: UpdateParamDTO): Promise<IAnswer<void>> {        
        try {
            let model = await this[`model${dto.obj}`].findById (dto._id);        
            model[dto.p] = dto.v;
            await model.save ();

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateparam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async updateEgoisticParam (dto: UpdateEgoisticParamDTO): Promise<IAnswer<void>> {        
        try {
            if (dto.v) { // if param is true, first set all to false, because it is egoistic! :-)                
                await this[`model${dto.obj}`].updateMany({}, {$set: {[dto.p]: false}});
            }
            
            let model = await this[`model${dto.obj}`].findById (dto._id);        
            model[dto.p] = dto.v;
            await model.save ();

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateEgoisticParam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
