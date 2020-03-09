import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Lang } from '../../model/lang.model';
import { DataService } from '../data.service';

@Injectable()
export class LangRepository extends Repository<Lang> {        
    public current: Lang | null = null;

    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "pos";
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.xl && new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                this.dataService.langsAll(this.sortBy, this.sortDir).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Lang().build(d)) : [];                        
                        this.loadedAt = new Date().getTime();
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
}
