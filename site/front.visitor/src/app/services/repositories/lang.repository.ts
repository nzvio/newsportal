import { Injectable } from '@angular/core';

import { Lang } from '../../model/orm/lang.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';
import { BehaviorSubject } from 'rxjs';
import { IGetallDTO } from 'src/app/model/dto/getall.dto';

@Injectable()
export class LangRepository extends SimpleRepository<Lang> {        
    public current: BehaviorSubject<Lang | null> = new BehaviorSubject(null);

    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "pos";
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                const dto: IGetallDTO = {sortBy: this.sortBy, sortDir: this.sortDir};
                this.dataService.langsAll(dto).subscribe(res => {
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
