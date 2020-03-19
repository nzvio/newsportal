import { Document } from "mongoose";

export interface ITag extends Document {
    readonly _id: string;
    readonly name: Object;    
    readonly active: boolean;
    readonly defended: boolean;
}
