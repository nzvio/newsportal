import { Document } from "mongoose";

export interface IDonor extends Document {
    readonly _id: string;
    readonly name: string;
    readonly encoding: string;
    readonly selector_content: string;
    readonly selector_img: string;
    readonly defended: boolean;
}
