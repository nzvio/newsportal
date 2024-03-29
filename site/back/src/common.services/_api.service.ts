import { Model } from "mongoose";
import { ISluggable } from "../model/sluggable.interface";

export abstract class APIService {
    protected isEmpty(v: any): boolean {
        return v === null || v === undefined;
    }

    protected async checkSlug(model: Model<ISluggable>, slug: string, _id: string | null, iteration: number): Promise<string> {
        let candidate: string = (iteration) ? `${slug}-${iteration}` : slug;
        let res: ISluggable | null = await model.findOne({slug: candidate, _id: {$ne: _id}});
        
        if (res) {            
            return this.checkSlug(model, slug, _id, iteration + 1);
        }

        return candidate;
    }

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    protected formatDate(date: Date): string {
        return `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}:${this.twoDigits(date.getSeconds())}`;
    }

    protected getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    protected createPassword(length: number): string {
        let result: string = '';
        let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        
        for (let i: number = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
     }
}
