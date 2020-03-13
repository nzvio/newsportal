import { Document } from "mongoose";

export interface ITag extends Document {
    readonly _id: string;
    readonly name: string;
    readonly lang: string;
    readonly active: boolean;
    readonly defended: boolean;
}
