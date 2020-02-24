import { PhraseDTO } from "./phrase.dto";

export class LangUpdateDTO {    
    public readonly _id: string;
    public readonly name: string;
    public readonly slug: string;
    public readonly title: string;
    public readonly img: string;
    public readonly img_s: string;
    public readonly pos: number;
    public readonly active: boolean;
    public readonly dir: string;     
    public readonly phrases: PhraseDTO[];
}
