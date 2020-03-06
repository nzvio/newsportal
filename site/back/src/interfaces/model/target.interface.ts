import { Document } from "mongoose";
import { IDonor } from "./donor.interface";

export interface ITarget extends Document {
    readonly _id: string;    
    readonly donor: string | IDonor;
    readonly rss: string;
    readonly category: string;
    readonly lang: string;
    readonly active: boolean;
    readonly defended: boolean;
}
