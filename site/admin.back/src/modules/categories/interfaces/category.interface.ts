import { Document } from "mongoose";

export interface ICategory extends Document {
    readonly _id: string;
    readonly name: Object;
    readonly h1: Object;
    readonly contentshort: Object;
    readonly content: Object;
    readonly title: Object;
    readonly keywords: Object;
    readonly description: Object;
    readonly img: string;
    readonly img_s: string;
    readonly parent: string;
    readonly slug: string;
    readonly active: boolean;
    readonly pos: number;
    readonly defended: boolean;    
}
