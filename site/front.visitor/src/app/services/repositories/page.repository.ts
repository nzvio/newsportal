import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Page } from '../../model/page.model';
import { DataService } from '../data.service';

@Injectable()
export class PageRepository extends Repository<Page> {
    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "pos";
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.xl && new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                this.dataService.pagesAll(this.sortBy, this.sortDir).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Page().build(d)) : [];                           
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
