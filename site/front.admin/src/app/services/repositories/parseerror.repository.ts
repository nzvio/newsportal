import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Parseerror } from '../../model/orm/parseerror.model';
import { DataService } from '../data.service';
import { IGetchunkDTO } from '../../model/dto/getchunk.dto';

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
                const dto: IGetchunkDTO = {
                    from: this.chunkCurrentPart * this.chunkLength,
                    q: this.chunkLength,
                    sortBy: this.chunkSortBy,
                    sortDir: this.chunkSortDir,                    
                };
                this.dataService.parseerrorsChunk(dto).subscribe(res => {
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
