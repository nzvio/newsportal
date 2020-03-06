import { Model } from './model';

export class Donor extends Model {
    public _id: string;
    public name: string;
    public encoding: string;
    public selector_content: string;
    public selector_img: string;
    public defended: boolean;

    public init(): Donor {
        this.encoding = "utf-8";
        return this;
    }
}
