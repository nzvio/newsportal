import { Injectable } from '@angular/core';

import { Repository } from './repository';
import { Parseerror } from '../../model/parseerror.model';
import { DataService } from '../data.service';

@Injectable()
export class ParseerrorRepository extends Repository<Parseerror> {
    public schema: string = "Parseerror";
    public chunkSortBy: string = "date";
    public chunkSortDir: number = -1;    

    constructor(protected dataService: DataService) {
        super(dataService);
    }    
    
    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                this.dataService.parseerrorsChunk(this.chunkCurrentPart * this.chunkLength, this.chunkLength, this.chunkSortBy, this.chunkSortDir).subscribe(res => {
                    if (res.statusCode === 200) {                        
                        this.xlChunk = res.data.length ? res.data.map(d => new Parseerror().build(d)) : [];
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

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.parseerrorsDelete(_id).subscribe(res => {
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
            this.dataService.parseerrorsDeleteBulk(_ids).subscribe(res => {
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
