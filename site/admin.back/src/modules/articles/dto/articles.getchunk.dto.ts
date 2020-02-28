export class ArticlesGetchunkDTO {
    public readonly from?: number;
    public readonly q?: number;
    public readonly sortBy?: string;
    public readonly sortDir?: number;    
    public readonly filterDate?: string | null;
    public readonly filterName?: string;
    public readonly filterCategory?: string | null;
    public readonly filterLang?: string | null;    
}
