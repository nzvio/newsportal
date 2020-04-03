import { Document } from "mongoose";

export interface IArticleVote extends Document {    
    readonly _id: string;
    article: string;
    user: string;
}
