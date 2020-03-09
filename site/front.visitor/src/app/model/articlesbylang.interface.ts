import { Article } from './article.model';

export interface IArticlesByLang {
    langId: string;
    loadedAt: number;
    xl: Article[];
}
