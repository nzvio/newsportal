import { Document } from "mongoose";

export interface IVote extends Document {    
    readonly _id: string;
    article: string;
    user: string;
}
