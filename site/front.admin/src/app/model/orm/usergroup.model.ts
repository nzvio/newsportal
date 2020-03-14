import { Model } from '../model';

export class Usergroup extends Model {
    public _id: string;
    public name: string;
    public title: string;
    public defended: boolean;        
}
