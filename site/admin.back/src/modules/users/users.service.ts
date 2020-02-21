import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { APIService } from "../api.service";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService extends APIService {
    constructor (@InjectModel("User") private readonly model: Model<IUser>) {
        super();
    }

    // for auth service
    public async oneByEmail(email: string): Promise<IUser | undefined> {
        return this.model.findOne({email: email});
    }    
}
