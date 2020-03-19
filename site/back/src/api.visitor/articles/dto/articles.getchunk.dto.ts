export class ArticlesGetchunkDTO {
    public readonly from?: number;
    public readonly q?: number;
    public readonly sortBy?: string;
    public readonly sortDir?: number;    
    public readonly filterDate?: string;
    public readonly filterName?: string;
    public readonly filterCategory?: string;
    public readonly filterLang?: string; 
    public readonly filterLoadedAt?: number;   
    public readonly filterUser?: string;
    public readonly filterTag?: string;
}
