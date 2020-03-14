import { Model } from '../model';

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
    public top: boolean;
    public main: boolean;
    public popular: boolean;
    public recommended: boolean;
    public category: string;
    public lang: string;
    public user: string;
    public viewsq: number;
    public tags: string[];
    public defended: boolean;    

    get formatedDate(): string {return `${this.twoDigits(this.date.getUTCDate())}.${this.twoDigits(this.date.getUTCMonth()+1)}.${this.date.getUTCFullYear()} ${this.twoDigits(this.date.getUTCHours())}:${this.twoDigits(this.date.getUTCMinutes())}`;}

    public init(): Article {
        this.date = new Date();
        this.active = true;
        this.top = false;
        this.main = false;
        this.popular = false;
        this.recommended = false;
        this.category = null;
        this.lang = null;
        this.user = null;        
        
        return this;
    }
}
