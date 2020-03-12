import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";

import { Article } from '../../model/article.model';
import { AppService } from '../../services/app.service';
import { Lang } from '../../model/lang.model';
import { ArticlePopularRepository } from '../../services/repositories/article.popular.repository';

@Component({
    selector: "articles-popular",
    templateUrl: "./articles.popular.component.html",
    styleUrls: ["./articles.popular.component.scss"]
})
export class ArticlesPopularComponent implements OnChanges {
    @Input() currentLang: Lang;
    public ready: boolean = false;  
    public leftArticle: Article;
    public rightArticles: Article[];

    constructor(
        private articlePopularRepository: ArticlePopularRepository,
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articlePopularRepository.xl;}    

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {        
        if (changes.currentLang) {
            try {
                this.ready = false;
                this.articlePopularRepository.filterLang = this.currentLang._id;            
                await this.articlePopularRepository.load();                  
                this.ready = this.buildArticles();
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
    }    

    private buildArticles(): boolean {
        if (this.articles.length) {
            this.leftArticle = this.articles[0];
            this.rightArticles = [];

            for (let i: number = 1; i < this.articles.length; i++) {
                this.rightArticles.push(this.articles[i]);
            }

            return true;
        }

        return false;
    }
}