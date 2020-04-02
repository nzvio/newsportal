import { Document } from "mongoose";

import { IArticle } from "./article.interface";
import { IUser } from "./user.interface";

export interface IComment extends Document {
    readonly _id: string;
    readonly date: Date;
    readonly article: string | IArticle;
    user: string | IUser;
    readonly content: string;
    readonly likes: number;
    readonly dislikes: number;
    readonly active: boolean;
    readonly defended: boolean;
}
