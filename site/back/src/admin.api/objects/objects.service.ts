import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { AdminAPIService } from "../_admin.api.service";
import { UpdateParamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { IUsergroup } from "../../interfaces/model/usergroup.interface";
import { IUser } from "../../interfaces/model/user.interface";
import { ILang } from "../../interfaces/model/lang.interface";
import { IPage } from "../../interfaces/model/page.interface";
import { UpdateEgoisticParamDTO } from "./dto/updateegoisticparam.dto";
import { ICategory } from "../../interfaces/model/category.interface";
import { IArticle } from "../../interfaces/model/article.interface";
import { IDonor } from "../../interfaces/model/donor.interface";
import { ITarget } from "../../interfaces/model/target.interface";

@Injectable()
export class ObjectsService extends AdminAPIService {
    constructor (
        @InjectModel("Usergroup") private readonly modelUsergroup: Model<IUsergroup>,
        @InjectModel("User") private readonly modelUser: Model<IUser>,
        @InjectModel("Lang") private readonly modelLang: Model<ILang>,
        @InjectModel("Page") private readonly modelPage: Model<IPage>,
        @InjectModel("Category") private readonly modelCategory: Model<ICategory>,
        @InjectModel("Article") private readonly modelArticle: Model<IArticle>,
        @InjectModel("Donor") private readonly modelDonor: Model<IDonor>,
        @InjectModel("Target") private readonly modelTarget: Model<ITarget>,
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
