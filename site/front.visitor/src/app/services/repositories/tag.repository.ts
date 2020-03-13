import { Injectable } from '@angular/core';

import { Tag } from '../../model/tag.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';
import { IGetallDTO } from 'src/app/model/dto/getall.dto';

@Injectable()
export class TagRepository extends SimpleRepository<Tag> {
    constructor(protected dataService: DataService) {
        super();
        this.sortBy = "name";
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                const dto: IGetallDTO = {sortBy: this.sortBy, sortDir: this.sortDir};
                this.dataService.tagsAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Tag().build(d)) : [];                           
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
