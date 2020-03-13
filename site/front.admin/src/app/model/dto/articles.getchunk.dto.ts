export interface IArticlesGetchunkDTO {
    readonly from?: number;
    readonly q?: number;
    readonly sortBy?: string;
    readonly sortDir?: number;    
    readonly filterDate?: Date | null;
    readonly filterName?: string;
    readonly filterCategory?: string | null;
    readonly filterLang?: string | null;
}
