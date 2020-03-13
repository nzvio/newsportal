import { Document } from "mongoose";

export interface ISluggable extends Document {
    slug: string;
}
