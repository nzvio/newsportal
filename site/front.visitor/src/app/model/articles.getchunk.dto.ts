export interface ArticlesGetchunkDTO {
    readonly from?: number;
    readonly q?: number;
    readonly sortBy?: string;
    readonly sortDir?: number;    
    readonly filterDate?: Date;
    readonly filterName?: string;
    readonly filterCategory?: string;
    readonly filterLang?: string;
}
