import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Article } from '../../model/orm/article.model';
import { DataService } from '../data.service';
import { IArticlesGetchunkDTO } from '../../model/dto/articles.getchunk.dto';

@Injectable()
export class ArticleRepository extends Repository<Article> {
    // inherited
    public schema: string = "Article";    
    public chunkSortBy: string = "_id"; 
    public chunkSortDir: number = -1; 
    // local
    public filterDate: Date | null = null;
    public filterName: string = "";
    public filterCategory: string | null = "any";
    public filterLang: string | null = "any";

    constructor(protected dataService: DataService) {
        super(dataService);
    }    
    
    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                const dto: IArticlesGetchunkDTO = {
                    from: this.chunkCurrentPart * this.chunkLength,
                    q: this.chunkLength,
                    sortBy: this.chunkSortBy,
                    sortDir: this.chunkSortDir,
                    filterDate: this.filterDate,
                    filterName: this.filterName,
                    filterCategory: this.filterCategory,
                    filterLang: this.filterLang,
                };
                this.dataService.articlesChunk(dto).subscribe(res => {
                    if (res.statusCode === 200) {                        
                        this.xlChunk = res.data.length ? res.data.map(d => new Article().build(d)) : [];
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

    public loadOne(_id: string): Promise<Article> {
        return new Promise((resolve, reject) => {
            this.dataService.articlesOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Article = new Article().build(res.data);                    
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
            this.dataService.articlesDelete(_id).subscribe(res => {
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
            this.dataService.articlesDeleteBulk(_ids).subscribe(res => {
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

    public create(x: Article): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.articlesCreate(x).subscribe(res => {
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

    public update(x: Article): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.articlesUpdate(x).subscribe(res => {
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
