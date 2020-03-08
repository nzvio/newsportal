import { Model } from './model';

export class Page extends Model {
    public _id: string;
    public name: Object;
    public h1: Object;
    public contentshort: Object;
    public content: Object;
    public title: Object;
    public keywords: Object;
    public description: Object;
    public img: string;
    public img_s: string;
    public parent: string;
    public slug: string;
    public active: boolean;
    public pos: number;
    public defended: boolean;
    public __children: Page[]; // from API but not from DB    
}
