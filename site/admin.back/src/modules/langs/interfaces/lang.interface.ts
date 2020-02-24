import { Document } from "mongoose";
import { IPhrase } from "./phrase.interface";

export interface ILang extends Document
{
    readonly _id: string;
    readonly name: string;
    readonly slug: string;
    readonly title: string;
    readonly img: string;
    readonly img_s: string;
    readonly pos: number;
    readonly active: boolean;
    readonly dir: string; 
    readonly defended: boolean;
    readonly phrases: IPhrase[];
}
