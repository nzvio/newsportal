import { Model } from '../model'

export class Setting extends Model {
    public _id: string;
    public p: string;
    public v: string;
    public c: string;
    public pos: string;
    public defended: boolean;
}
