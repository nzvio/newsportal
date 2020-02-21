import { Document } from "mongoose";

export interface IUsergroup extends Document {
    readonly _id: string;
    readonly name: string;
    readonly title: string;
    readonly defended: boolean;
}
