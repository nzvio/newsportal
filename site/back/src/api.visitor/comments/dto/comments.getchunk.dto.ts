export class CommentsGetchunkDTO {
    public readonly from?: number;
    public readonly q?: number;
    public readonly sortBy?: string;
    public readonly sortDir?: number;    
    public readonly filterArticle?: string;    
    public readonly filterLang?: string;
}
