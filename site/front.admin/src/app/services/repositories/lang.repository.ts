import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Lang } from '../../model/lang.model';
import { DataService } from '../data.service';
import { AppService } from '../app.service';
import { IGetallDTO } from '../../model/dto/getall.dto';
import { IGetchunkDTO } from '../../model/dto/getchunk.dto';

@Injectable()
export class LangRepository extends Repository<Lang> {
    public schema: string = "Lang";
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
                this.dataService.langsAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlFull = res.data.length ? res.data.map(d => new Lang().build(d)) : [];                        
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
                this.dataService.langsChunk(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlChunk = res.data.length ? res.data.map(d => new Lang().build(d)) : [];
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

    public loadOne(_id: string): Promise<Lang> {
        return new Promise((resolve, reject) => {
            this.dataService.langsOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Lang = new Lang().build(res.data);   
                        this.appService.sort(x.phrases, "pos", 1);
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
            this.dataService.langsDelete(_id).subscribe(res => {
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
            this.dataService.langsDeleteBulk(_ids).subscribe(res => {
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

    public create(x: Lang): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.langsCreate(x).subscribe(res => {
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

    public update(x: Lang): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.langsUpdate(x).subscribe(res => {
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
