import { Document } from "mongoose";

export interface ISetting extends Document {
    readonly _id: string;
    readonly p: string;
    readonly v: string;
    readonly c: string;
    readonly pos: number;
    readonly defended: boolean;
}
