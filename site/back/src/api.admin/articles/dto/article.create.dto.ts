export class ArticleCreateDTO {
    public readonly date: Date;
    public readonly name: string;
    public readonly contentshort: string;
    public readonly content: string;
    public readonly h1: string;
    public readonly title: string;
    public readonly keywords: string;
    public readonly description: string;
    public readonly img: string;
    public readonly img_s: string;
    public slug: string; // not readonly because slug can be rebuilded after check for duplication
    public readonly source: string;
    public readonly active: boolean;
    public readonly category: string;
    public readonly lang: string;
    public readonly top: boolean;
    public readonly main: boolean;
    public readonly popular: boolean;
    public readonly recommended: boolean;    
    public readonly user: string;
    public readonly tags: string[];
}
