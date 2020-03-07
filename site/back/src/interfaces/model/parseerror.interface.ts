import { Document } from "mongoose";
import { ITarget } from "./target.interface";

export interface IParseerror extends Document {
    readonly _id: string;
    readonly date: Date;
    target: string | ITarget;
    message: string;
}
