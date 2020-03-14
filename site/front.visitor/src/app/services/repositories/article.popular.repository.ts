import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Article } from '../../model/orm/article.model';
import { IArticlesGetchunkDTO } from '../../model/dto/articles.getchunk.dto';
import { SimpleRepository } from './_simple.repository';

@Injectable()
export class ArticlePopularRepository extends SimpleRepository<Article> {
    public filterLang: string = "";
    
    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
    }
    
    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let dto: IArticlesGetchunkDTO = {from: 0, q: 4, filterLang: this.filterLang, sortBy: this.sortBy, sortDir: this.sortDir};
            this.dataService.articlesPopular(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xl = res.data.length ? res.data.map(d => new Article().build(d)) : [];                    
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
