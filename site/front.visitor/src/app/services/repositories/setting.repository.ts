import { Injectable } from '@angular/core';

import { Setting } from '../../model/orm/setting.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';

@Injectable()
export class SettingRepository extends SimpleRepository<Setting> {
    constructor(protected dataService: DataService) {
        super();        
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {                
                this.dataService.settingsAll().subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Setting().build(d)) : [];                           
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
    
    public param(p: string): string | null {
        let x: Setting | null = this.xl.find(x => x.p === p) || null; 
        return x ? x.v : null;
    }
}
