import { Model } from './model';

export class Article extends Model {
    public _id: string;
    public date: Date;
    public name: string;
    public contentshort: string;
    public content: string;
    public h1: string;
    public title: string;
    public keywords: string;
    public description: string;
    public img;
    public img_s;
    public slug: string;
    public source: string;
    public active: boolean;
    public category: string;
    public lang: string;
    public defended: boolean;

    get formatedDate(): string {return `${this.twoDigits(this.date.getUTCDate())}.${this.twoDigits(this.date.getUTCMonth()+1)}.${this.date.getUTCFullYear()} ${this.twoDigits(this.date.getUTCHours())}:${this.twoDigits(this.date.getUTCMinutes())}`;}

    public init(): Article {
        this.date = new Date();
        this.active = true;
        this.category = null;
        this.lang = null;
        
        return this;
    }
}
