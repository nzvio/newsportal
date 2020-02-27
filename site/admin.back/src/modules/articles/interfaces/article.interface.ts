import { Document } from "mongoose";

export interface IArticle extends Document {
    readonly _id: string;
    readonly date: Date;
    readonly name: string;
    readonly contentshort: string;
    readonly content: string;
    readonly h1: string;
    readonly title: string;
    readonly keywords: string;
    readonly description: string;
    readonly img;
    readonly img_s;
    readonly slug: string;
    readonly source: string;
    readonly active: boolean;
    readonly category: string;
    readonly lang: string;
    readonly defended: boolean;
}
