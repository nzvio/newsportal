export interface CommentsGetchunkDTO {
    readonly from?: number;
    readonly q?: number;
    readonly sortBy?: string;
    readonly sortDir?: number;    
    readonly filterArticle?: string;
    readonly filterLang?: string;
}
