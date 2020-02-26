export class PageCreateDTO {    
    public readonly name: Object;
    public readonly h1: Object;
    public readonly contentshort: Object;
    public readonly content: Object;
    public readonly title: Object;
    public readonly keywords: Object;
    public readonly description: Object;
    public readonly img: string;
    public readonly img_s: string;
    public parent: string; // not readonly because we will delete null values
    public slug: string; // not readonly because slug can be rebuilded after check for duplication
    public readonly active: boolean;
    public readonly pos: number;    
}
