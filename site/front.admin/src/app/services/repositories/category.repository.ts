import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Category } from '../../model/orm/category.model';
import { DataService } from '../data.service';
import { AppService } from '../app.service';
import { IGetallDTO } from '../../model/dto/getall.dto';
import { IGetchunkDTO } from '../../model/dto/getchunk.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
    public schema: string = "Category";
    public fullSortBy: string = "pos";
    public chunkSortBy: string = "pos";

    constructor(
        protected dataService: DataService,
        private appService: AppService,
    ) {
        super(dataService);
    }

    public loadFull(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve();
            } else {
                const dto: IGetallDTO = {
                    sortBy: this.fullSortBy,
                    sortDir: this.fullSortDir,                    
                };
                this.dataService.categoriesAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        let xl: Category[] = res.data.length ? res.data.map(d => new Category().build(d)) : [];                        
                        this.xlFull = this.appService.tree2list(xl) as Category[];                        
                        this.fullLoadedAt = new Date().getTime();
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
                this.dataService.categoriesChunk(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        let xl: Category[] = res.data.length ? res.data.map(d => new Category().build(d)) : [];                        
                        this.xlChunk = this.appService.tree2list(xl) as Category[];
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

    public loadOne(_id: string): Promise<Category> {
        return new Promise((resolve, reject) => {
            this.dataService.categoriesOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Category = new Category().build(res.data);                           
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }                    
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.categoriesDelete(_id).subscribe(res => {
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
            this.dataService.categoriesDeleteBulk(_ids).subscribe(res => {
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

    public create(x: Category): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.categoriesCreate(x).subscribe(res => {
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

    public update(x: Category): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.categoriesUpdate(x).subscribe(res => {
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
