import { Document } from "mongoose";

export interface ICommentVote extends Document {    
    readonly _id: string;
    comment: string;
    user: string;
}
