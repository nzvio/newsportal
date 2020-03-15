import { Model } from '../model';
import { Category } from './category.model';
import { Lang } from './lang.model';
import { User } from './user.model';

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
    public category: Category;
    public lang: string;
    public user: User;
    public viewsq: number;
    public rating: number;
    public votesq: number;       
    public defended: boolean;
    public __commentsq: number;

    public formatedDate(lang: Lang): string {
        return `${this.date.getDate()} ${lang.s('month-'+(this.date.getMonth()+1))} ${this.date.getFullYear()}, ${this.date.getHours()}:${this.twoDigits(this.date.getMinutes())}`;
    }

    get formatedRating(): number {return this.votesq ? this.rating / this.votesq : 0;}
}
