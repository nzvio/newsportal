import { Document } from "mongoose";

export interface IUsercode extends Document {
    readonly _id: string;
    email: string;
    code: string;
}
