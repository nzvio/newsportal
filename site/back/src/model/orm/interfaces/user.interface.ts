import { Document } from "mongoose";

export interface IUser extends Document {    
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    password: string; // not readonly because we will erase it after auth procedure
    readonly img: string;
    readonly img_s: string;
    readonly active: boolean;
    usergroup: string; // not readonly because it will be set when registering
    readonly defended: boolean;
}
