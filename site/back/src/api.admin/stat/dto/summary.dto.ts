export interface ISummary {
    readonly articles: number;
    readonly categories: number;
    readonly comments: number;
    readonly users: number;
    readonly articleviews?: number;
}