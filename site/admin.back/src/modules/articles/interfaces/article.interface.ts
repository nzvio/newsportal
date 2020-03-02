import { Document } from "mongoose";

export interface IArticle extends Document {
    readonly _id: string;
    date: Date;
    name: string;
    contentshort: string;
    content: string;
    h1: string;
    title: string;
    keywords: string;
    description: string;
    img: string;
    img_s: string;
    slug: string;
    source: string;
    active: boolean;
    category: string;
    lang: string;
    defended: boolean;
}
