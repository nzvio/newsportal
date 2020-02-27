// we using special DTO for responses(!), because we need extra field (__children), but we can't insert it to interface inherited from Mongoose Document
export class CategoryDTO {
    public readonly _id: string;
    public readonly name: Object;
    public readonly h1: Object;
    public readonly contentshort: Object;
    public readonly content: Object;
    public readonly title: Object;
    public readonly keywords: Object;
    public readonly description: Object;
    public readonly img: string;
    public readonly img_s: string;
    public readonly parent: string;
    public readonly slug: string;
    public readonly active: boolean;
    public readonly pos: number;
    public readonly defended: boolean;
    public __children: CategoryDTO[];    
}
