import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Article } from '../../model/article.model';
import { ArticlesGetchunkDTO } from '../../model/articles.getchunk.dto';
import { AdvancedRepository } from './_advanced.repository';
import { IArticlesByLang } from "../../model/articlesbylang.interface";

@Injectable()
export class ArticleMainRepository extends AdvancedRepository<IArticlesByLang> {    
    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
    }
    
    public load(langId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let list: IArticlesByLang | null = this.lists.find(list => list.langId === langId) || null;
            
            if (list && new Date().getTime() - list.loadedAt < this.ttl) {                
                resolve();
            } else {                
                let dto: ArticlesGetchunkDTO = {from: 0, q: 6, filterLang: langId, sortBy: this.sortBy, sortDir: this.sortDir};
                this.dataService.articlesMain(dto).subscribe(res => {                    
                    if (res.statusCode === 200) {
                        let xl: Article[] = res.data.length ? res.data.map(d => new Article().build(d)) : [];                           
                        let loadedAt: number = new Date().getTime();
                        
                        if (list) {
                            list.xl = xl;
                            list.loadedAt = loadedAt;
                        } else {
                            this.lists.push({langId, xl, loadedAt});
                        }                        
                        
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
