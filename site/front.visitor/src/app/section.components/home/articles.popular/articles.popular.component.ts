import { Component, OnInit, OnDestroy } from "@angular/core";

import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { ArticlePopularRepository } from '../../../services/repositories/article.popular.repository';
import { Subscription } from 'rxjs';

@Component({
    selector: "articles-popular",
    templateUrl: "./articles.popular.component.html",
    styleUrls: ["./articles.popular.component.scss"]
})
export class ArticlesPopularComponent implements OnInit, OnDestroy {    
    public ready: boolean = false;  
    public leftArticle: Article;
    public rightArticles: Article[];
    private langSubscription: Subscription;

    constructor(
        private articlePopularRepository: ArticlePopularRepository,        
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articlePopularRepository.xl;}    
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.langSubscription = this.appService.currentLang.subscribe(async lang => {
            try {
                this.ready = false;
                this.articlePopularRepository.filterLang = lang._id;            
                await this.articlePopularRepository.load();                  
                this.ready = this.buildArticles();
            } catch (err) {
                this.appService.showNotification(err, "error");
            }  
        });
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
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