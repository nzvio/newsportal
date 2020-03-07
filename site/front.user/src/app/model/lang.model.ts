import { Model } from './model';
import { Phrase } from './phrase';

export class Lang extends Model {
    public _id: string;
    public name: string;
    public slug: string;
    public title: string;
    public img: string;
    public img_s: string;
    public pos: number;
    public active: boolean;
    public sluggable: boolean;
    public dir: string; 
    public defended: boolean;
    public phrases: Phrase[];     

    public s(mark: string): string {
        let phrase: Phrase | null = this.phrases.find(ph => ph.mark === mark) || null;
        return phrase ? phrase.text : "";
    }
}
