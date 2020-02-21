import { IAnswer } from 'src/app/model/answer.interface';

export abstract class Repository<T> {
    public xlChunk: T[] = []; // fragment
    public chunkCurrentPart: number = 0; // current paging state for fragment
    public chunkSortBy: string = "_id"; // current sort by for fragment
    public chunkSortDir: number = 1; // current sort direction for fragment    
    public chunkLength: number = 10; // current length of fragment
    protected chunkLoadedAt: number = 0; // last load timestamp for fragment loading

    public xlAll: T[] = []; // all objects
    public allSortBy: string = "_id"; // current sort by for all objects
    public allSortDir: number = 1; // curent sort direction for all objects        
    protected allLoadedAt: number = 0; // last load timestamp for full loading
    
    public fullLength: number = 0; // quantity of all objects in table    
    protected ttl: number = 1000*60; // time to live = 1 min    

    public invalidateChunk(): void {        
        this.chunkLoadedAt = 0;
    }    

    public abstract loadChunk(): Promise<void>;
    public abstract updateParam (_id: string, p: string, v: any): Promise<IAnswer<void>>;
    public abstract delete(_id: string): Promise<IAnswer<void>>;
    public abstract deleteBulk(_ids: string[]): Promise<IAnswer<void>>;
}
