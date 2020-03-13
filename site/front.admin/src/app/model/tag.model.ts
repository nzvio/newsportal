import { Model } from './model';

export class Tag extends Model {
    public _id: string;
    public name: string;
    public lang: string;
    public active: boolean;
    public defended: boolean;

    public init(): Tag {
        this.active = true;
        this.lang = null;
        return this;
    }
}