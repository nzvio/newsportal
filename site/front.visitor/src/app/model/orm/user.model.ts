import { Model } from '../model';
import { Lang } from './lang.model';

export class User extends Model {    
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public img: string;
    public img_s: string;
    public active: boolean;
    public usergroup: string;
    public defended: boolean;   
    public __articlesq: number;
    public __commentsq: number; 
    public __createdat: string;
    public __rating: number;
    public __votesq: number;
    public __loadedat: number;

    get formatedRating(): number {return this.__votesq ? this.__rating / this.__votesq : 0;}
    get firstLetter(): string {return this.name.substr(0, 1);}

    public formatedCreatedAt(lang: Lang): string {
        const date: Date = new Date(this.__createdat);
        return `${date.getDate()} ${lang.s('month-'+(date.getMonth()+1))} ${date.getFullYear()}, ${date.getHours()}:${this.twoDigits(date.getMinutes())}`;
    }    
}
