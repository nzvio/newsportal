import { Model } from '../model';

export class Tag extends Model {
    public _id: string;
    public name: Object;    
    public active: boolean;
    public defended: boolean;    
}
