import { Injectable } from "@angular/core";
import { SimpleRepository } from './_simple.repository';
import { Article } from '../../model/orm/article.model';
import { DataService } from '../data.service';
import { IArticlesGetchunkDTO } from '../../model/dto/articles.getchunk.dto';

@Injectable()
export class ArticleByUserRepository extends SimpleRepository<Article> {
    public filterLang: string = "";
    public filterUser: string = "";
    public exhausted: boolean = false;

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
                filterUser: this.filterUser,
                filterLoadedAt: this.loadedAt,
            };
            this.dataService.articlesChunkByUser(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    const data: Article[] =  res.data.length ? res.data.map(d => new Article().build(d)) : [];                      
                    this.xl = [...this.xl, ...data];
                    this.fullLength = res.fullLength;                                     
                    this.exhausted = this.currentPart + 1 === Math.ceil(this.fullLength / this.chunkLength);
                    // time of first load, will be used in "infinite scroll" on "loading more"
                    // articles, that created after first load, will not be displayed
                    !this.loadedAt ? this.loadedAt = new Date().getTime() : null; 
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
