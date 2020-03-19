import { Model } from '../model';

export class Tag extends Model {
    public _id: string;
    public name: Object;    
    public active: boolean;
    public defended: boolean;

    public init(): Tag {
        this.active = true;
        this.name = {};
        
        return this;
    }
}