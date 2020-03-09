export abstract class AdvancedRepository<T> {    
    public lists: T[] = []; // objects lists
    public sortBy: string = "_id"; // current sort by
    public sortDir: number = 1; // current sort direction
    protected ttl: number = 1000*60*60; // time to live = 1 hour    
}
