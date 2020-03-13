import { Injectable } from '@angular/core';

import { Category } from '../../model/category.model';
import { DataService } from '../data.service';
import { SimpleRepository } from './_simple.repository';
import { IGetallDTO } from 'src/app/model/dto/getall.dto';

@Injectable()
export class CategoryRepository extends SimpleRepository<Category> {
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
                this.dataService.categoriesAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Category().build(d)) : [];                           
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
