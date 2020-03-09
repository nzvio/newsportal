import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { DataService } from '../data.service';
import { Article } from '../../model/article.model';
import { ArticlesGetchunkDTO } from '../../model/articles.getchunk.dto';

@Injectable()
export class ArticleTopRepository extends Repository<Article> {
    private langId: string = "";
    
    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
    }
    
    public load(langId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.langId === langId && this.xl && new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                this.langId = langId;
                let dto: ArticlesGetchunkDTO = {from: 0, q: 6, filterLang: this.langId, sortBy: this.sortBy, sortDir: this.sortDir};
                this.dataService.articlesTop(dto).subscribe(res => {                    
                    if (res.statusCode === 200) {
                        this.xl = res.data.length ? res.data.map(d => new Article().build(d)) : [];                           
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
