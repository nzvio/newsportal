import { Injectable } from "@angular/core";
import { SimpleRepository } from './_simple.repository';
import { Article } from '../../model/orm/article.model';
import { DataService } from '../data.service';
import { IArticlesGetchunkDTO } from '../../model/dto/articles.getchunk.dto';

@Injectable()
export class ArticleByCategoryRepository extends SimpleRepository<Article> {
    public filterLang: string = "";
    public filterCategory: string = "";

    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
        this.chunkLength = 10;        
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let dto: IArticlesGetchunkDTO = {
                from: this.currentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir,                
                filterLang: this.filterLang,
                filterCategory: this.filterCategory,
            };
            this.dataService.articlesChunkByCategory(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    const data: Article[] =  res.data.length ? res.data.map(d => new Article().build(d)) : [];                      
                    this.xl = [...this.xl, ...data];
                    this.fullLength = res.fullLength;                 
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
