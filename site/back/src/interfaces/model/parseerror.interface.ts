import { Document } from "mongoose";

export interface IParseerror extends Document {
    readonly _id: string;
    date: Date;
    target: string;
    message: string;
}
