import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Article } from '../../model/article.model';
import { ArticlesGetchunkDTO } from '../../model/articles.getchunk.dto';
import { SimpleRepository } from './_simple.repository';

@Injectable()
export class ArticleTopRepository extends SimpleRepository<Article> {    
    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
    }
    
    public load(langId: string): Promise<void> {
        return new Promise((resolve, reject) => {            
            let dto: ArticlesGetchunkDTO = {from: 0, q: 6, filterLang: langId, sortBy: this.sortBy, sortDir: this.sortDir};
            this.dataService.articlesTop(dto).subscribe(res => {                    
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
