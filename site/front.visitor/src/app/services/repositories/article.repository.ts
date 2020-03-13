import { Injectable } from "@angular/core";
import { SimpleRepository } from './_simple.repository';
import { Article } from '../../model/article.model';
import { DataService } from '../data.service';
import { IArticlesGetchunkDTO } from '../../model/dto/articles.getchunk.dto';

@Injectable()
export class ArticleRepository extends SimpleRepository<Article> {
    public filterLang: string = "";

    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
        this.chunkLength = 6;        
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let dto: IArticlesGetchunkDTO = {
                from: this.currentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir,                
                filterLang: this.filterLang,
            };
            this.dataService.articlesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xl = res.data.length ? res.data.map(d => new Article().build(d)) : [];   
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
