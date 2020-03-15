import { ICategory } from "../../../model/orm/interfaces/category.interface";
import { IUser } from "../../../model/orm/interfaces/user.interface";
import { ITag } from "../../../model/orm/interfaces/tag.interface";

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
    public readonly user: string | IUser;    
    public readonly tags: string[] | ITag[];
    public readonly viewsq: number;
    public readonly rating: number;
    public readonly votesq: number;
    public readonly defended: boolean;
    public readonly __commentsq: number;
    public readonly __created_at: number;
}
