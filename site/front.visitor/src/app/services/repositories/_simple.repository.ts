export abstract class SimpleRepository<T> {    
    public xl: T[] = []; // objects list
    public currentPart: number = 0; // current paging state for fragment
    public sortBy: string = "_id"; // current sort by
    public sortDir: number = 1; // current sort direction
    public chunkLength: number = 10; // current length of fragment
    public fullLength: number = 0; // quantity of all objects in table    
    protected loadedAt: number = 0; // last load timestamp    
    protected ttl: number = 1000*60*60; // time to live = 1 hour    

    public invalidate(): void {        
        this.loadedAt = 0;
    }    
}
