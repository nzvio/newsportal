import { Document } from "mongoose";
import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";

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
    top: boolean;
    main: boolean;
    popular: boolean;
    recommended: boolean;
    category: string | ICategory;
    lang: string;
    user: string | IUser;
    viewsq: number;
    defended: boolean;
}
