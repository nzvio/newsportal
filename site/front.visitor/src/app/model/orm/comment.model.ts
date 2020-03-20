import { Model } from '../model';
import { Article } from './article.model';
import { User } from './user.model';
import { Lang } from './lang.model';

export class Comment extends Model {
    public _id: string;
    public date: Date;
    public article: Article;
    public user: User;
    public content: string;
    public likes: number;
    public dislikes: number;
    public active: boolean;
    public defended: boolean;

    public build (o: Object): any {
        for (let field in o) {
            if (field === "date") {
                this[field] = new Date (o[field]);
            } else if (field === "user") {
                this[field] = new User().build(o[field]);
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public formatedDate(lang: Lang): string {
        return `${this.date.getDate()} ${lang.s('month-'+(this.date.getMonth()+1))} ${this.date.getFullYear()}, ${this.date.getHours()}:${this.twoDigits(this.date.getMinutes())}`;
    }
}
