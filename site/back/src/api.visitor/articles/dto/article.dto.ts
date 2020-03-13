import { ICategory } from "../../../model/orm/interfaces/category.interface";

// use it to return extended data object instead of standard IArticle
export class ArticleDTO {
    public readonly _id: string;
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
    public readonly slug: string;
    public readonly source: string;
    public readonly active: boolean;
    public readonly top: boolean;
    public readonly main: boolean;
    public readonly popular: boolean;
    public readonly recommended: boolean;
    public readonly category: string | ICategory;
    public readonly lang: string;
    public readonly defended: boolean;
    public readonly __commentsq: number;
}