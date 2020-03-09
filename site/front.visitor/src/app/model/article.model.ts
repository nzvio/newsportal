import { Model } from './model';
import { Category } from './category.model';

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
    public category: string | Category;
    public lang: string;
    public defended: boolean;

    get formatedDate(): string {return `${this.twoDigits(this.date.getUTCDate())}.${this.twoDigits(this.date.getUTCMonth()+1)}.${this.date.getUTCFullYear()} ${this.twoDigits(this.date.getUTCHours())}:${this.twoDigits(this.date.getUTCMinutes())}`;}    
}
