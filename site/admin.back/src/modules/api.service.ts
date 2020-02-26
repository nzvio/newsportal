import { Model } from "mongoose";
import { ISluggable } from "../interfaces/sluggable.interface";

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
}
