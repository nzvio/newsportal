import { Model } from './model';
import { Article } from './article.model';
import { User } from './user.model';

export class Comment extends Model {
    public _id: string;
    public date: Date;
    public article: string | Article;
    public user: string | User;
    public content: string;
    public likes: number;
    public dislikes: number;
    public active: boolean;
    public defended: boolean;

    get formatedDate(): string {return `${this.twoDigits(this.date.getUTCDate())}.${this.twoDigits(this.date.getUTCMonth()+1)}.${this.date.getUTCFullYear()} ${this.twoDigits(this.date.getUTCHours())}:${this.twoDigits(this.date.getUTCMinutes())}`;}
}
