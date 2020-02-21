import { Document } from "mongoose";

export interface IUser extends Document {    
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly img: string;
    readonly img_s: string;
    readonly active: boolean;
    readonly usergroup: string;
    readonly defended: boolean;
}
