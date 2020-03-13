import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Page } from '../../model/page.model';
import { DataService } from '../data.service';
import { AppService } from '../app.service';
import { IGetallDTO } from '../../model/dto/getall.dto';
import { IGetchunkDTO } from '../../model/dto/getchunk.dto';

@Injectable()
export class PageRepository extends Repository<Page> {
    public schema: string = "Page";
    public fullSortBy: string = "pos";
    public chunkSortBy: string = "pos";

    constructor(
        protected dataService: DataService,
        private appService: AppService,
    ) {
        super(dataService);
    }

    public loadFull(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve();
            } else {
                const dto: IGetallDTO = {
                    sortBy: this.fullSortBy,
                    sortDir: this.fullSortDir,                    
                };
                this.dataService.pagesAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        let xl: Page[] = res.data.length ? res.data.map(d => new Page().build(d)) : []
                        this.xlFull = this.appService.tree2list(xl) as Page[];                        
                        this.fullLoadedAt = new Date().getTime();
                        resolve();
                    } else {                        
                        reject(res.error);
                    }
                }, err => {
                    reject(err.message);
                });
            }            
        });
    }
    
    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                const dto: IGetchunkDTO = {
                    from: this.chunkCurrentPart * this.chunkLength,
                    q: this.chunkLength,
                    sortBy: this.chunkSortBy,
                    sortDir: this.chunkSortDir,                    
                };
                this.dataService.pagesChunk(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        let xl: Page[] = res.data.length ? res.data.map(d => new Page().build(d)) : [];
                        this.xlChunk = this.appService.tree2list(xl) as Page[];
                        this.fullLength = res.fullLength;
                        this.chunkLoadedAt = new Date().getTime();                    
                        resolve();
                    } else {                        
                        reject(res.error);
                    }                    
                }, err => {
                    reject(err.message);
                });
            }
        });
    }

    public loadOne(_id: string): Promise<Page> {
        return new Promise((resolve, reject) => {
            this.dataService.pagesOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Page = new Page().build(res.data);                           
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }                    
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.pagesDelete(_id).subscribe(res => {
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

    public deleteBulk(_ids: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.pagesDeleteBulk(_ids).subscribe(res => {
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

    public create(x: Page): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.pagesCreate(x).subscribe(res => {
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

    public update(x: Page): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.pagesUpdate(x).subscribe(res => {
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
}
