import { Injectable } from '@angular/core';
import { Repository } from '../../../services/repositories/_repository';
import { DataService } from '../../../services/data.service';

@Injectable()
export class ApdRepository extends Repository<number> {    
    constructor(protected dataService: DataService) {
        super(dataService);
    }    
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                this.dataService.statArticlesPerDay().subscribe(res => {
                    if (res.statusCode === 200) {                        
                        this.xlFull = res.data.length ? res.data : [];
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
