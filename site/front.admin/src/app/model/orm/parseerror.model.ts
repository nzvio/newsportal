import { Model } from '../model';
import { Target } from './target.model';

export class Parseerror extends Model {
    public _id: string;
    public date: Date;
    public target: string | Target;
    public message: string;

    get formatedDate(): string {return `${this.twoDigits(this.date.getUTCDate())}.${this.twoDigits(this.date.getUTCMonth()+1)}.${this.date.getUTCFullYear()} ${this.twoDigits(this.date.getUTCHours())}:${this.twoDigits(this.date.getUTCMinutes())}:${this.twoDigits(this.date.getUTCSeconds())}`;}
}