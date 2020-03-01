import { Document } from "mongoose";

export interface ITarget extends Document {
    readonly _id: string;    
    readonly donor: string;
    readonly rss: string;
    readonly category: string;
    readonly lang: string;
    readonly active: boolean;
    readonly defended: boolean;
}
