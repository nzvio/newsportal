import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../../services/_api.service";
import { UpdateParamDTO } from "./dto/updateparam.dto";
import { UpdateEgoisticParamDTO } from "./dto/updateegoisticparam.dto";
import { IAnswer } from "../../model/answer.interface";
import { IUsergroup } from "../../model/orm/interfaces/usergroup.interface";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { ILang } from "../../model/orm/interfaces/lang.interface";
import { IPage } from "../../model/orm/interfaces/page.interface";
import { ICategory } from "../../model/orm/interfaces/category.interface";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IDonor } from "../../model/orm/interfaces/donor.interface";
import { ITarget } from "../../model/orm/interfaces/target.interface";
import { IComment } from "../../model/orm/interfaces/comment.interface";
import { ITag } from "../../model/orm/interfaces/tag.interface";
import { ISetting } from "src/model/orm/interfaces/setting.interface";

@Injectable()
export class ObjectsService extends APIService {
    constructor (
        @InjectModel("Usergroup") private readonly modelUsergroup: Model<IUsergroup>,
        @InjectModel("User") private readonly modelUser: Model<IUser>,
        @InjectModel("Lang") private readonly modelLang: Model<ILang>,
        @InjectModel("Page") private readonly modelPage: Model<IPage>,
        @InjectModel("Category") private readonly modelCategory: Model<ICategory>,
        @InjectModel("Article") private readonly modelArticle: Model<IArticle>,
        @InjectModel("Donor") private readonly modelDonor: Model<IDonor>,
        @InjectModel("Target") private readonly modelTarget: Model<ITarget>,
        @InjectModel("Comment") private readonly modelComment: Model<IComment>,
        @InjectModel("Tag") private readonly modelTag: Model<ITag>,
        @InjectModel("Setting") private readonly modelSetting: Model<ISetting>,
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
