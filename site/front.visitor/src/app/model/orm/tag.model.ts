import { Model } from '../model';

export class Tag extends Model {
    public _id: string;
    public name: string;
    public lang: string;
    public active: boolean;
    public defended: boolean;    
}