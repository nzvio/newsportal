import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../api.service";
import { UpdateparamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { IUsergroup } from "../usergroups/interfaces/usergroup.interface";
import { IUser } from "../users/interfaces/user.interface";

@Injectable()
export class ObjectsService extends APIService {
    constructor (
        @InjectModel("Usergroup") private readonly modelUsergroup: Model<IUsergroup>,
        @InjectModel("User") private readonly modelUser: Model<IUser>,
    ) {
        super();
    }

    public async updateParam (dto: UpdateparamDTO): Promise<IAnswer<void>> {        
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
}