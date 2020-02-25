import { DataService } from '../data.service';

export abstract class Repository<T> {
    public abstract schema: string; // name of Mongoose schema
    
    public xlChunk: T[] = []; // fragment
    public chunkCurrentPart: number = 0; // current paging state for fragment
    public chunkSortBy: string = "_id"; // current sort by for fragment
    public chunkSortDir: number = 1; // current sort direction for fragment    
    public chunkLength: number = 10; // current length of fragment
    protected chunkLoadedAt: number = 0; // last load timestamp for fragment loading

    public xlFull: T[] = []; // all objects
    public fullSortBy: string = "_id"; // current sort by for all objects
    public fullSortDir: number = 1; // curent sort direction for all objects        
    protected fullLoadedAt: number = 0; // last load timestamp for full loading
    
    public fullLength: number = 0; // quantity of all objects in table    
    protected ttl: number = 1000*60; // time to live = 1 min    

    constructor(protected dataService: DataService) {}

    public invalidateChunk(): void {        
        this.chunkLoadedAt = 0;
    }
    
    public invalidateFull(): void {
        this.fullLoadedAt = 0;
    }

    public invalidateAll(): void {
        this.chunkLoadedAt = 0;
        this.fullLoadedAt = 0;
    }    

    public updateParam (_id: string, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.updateParam (this.schema, _id, p, v).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });        
    }

    public updateEgoisticParam (_id: string, p: string, v: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.updateEgoisticParam (this.schema, _id, p, v).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });        
    }

    public abstract loadChunk(): Promise<void>;
    public abstract loadOne(_id: string): Promise<T>;    
    public abstract delete(_id: string): Promise<void>;
    public abstract deleteBulk(_ids: string[]): Promise<void>;
    public abstract create(x: T): Promise<void>;
    public abstract update(x: T): Promise<void>;
}
