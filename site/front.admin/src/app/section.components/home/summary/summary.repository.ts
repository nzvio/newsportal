import { Injectable } from '@angular/core';
import { Repository } from '../../../services/repositories/_repository';
import { DataService } from '../../../services/data.service';
import { ISummary } from './summary.dto';

@Injectable()
export class SummaryRepository extends Repository<void> {    
    public summary: ISummary | null = null;
    
    constructor(protected dataService: DataService) {
        super(dataService);
    }    
    
    public load(): Promise<ISummary> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve(this.summary);
            } else {                
                this.dataService.statSummary().subscribe(res => {
                    if (res.statusCode === 200) {                        
                        this.summary = res.data;
                        this.fullLoadedAt = new Date().getTime();
                        resolve(this.summary);
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
