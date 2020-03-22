import { Component, OnInit, OnDestroy } from "@angular/core";

import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { ArticleMainRepository } from '../../../services/repositories/article.main.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { Category } from '../../../model/orm/category.model';
import { Subscription } from 'rxjs';

@Component({
    selector: "articles-main",
    templateUrl: "./articles.main.component.html",
    styleUrls: ["./articles.main.component.scss", "../../../common.styles/tabs.scss"]
})
export class ArticlesMainComponent implements OnDestroy, OnInit {    
    public currentCategoryId: string = "";
    public ready: boolean = false;    
    public articles: Article[] = [];
    private langSubscription: Subscription;

    constructor(
        private articleMainRepository: ArticleMainRepository,
        private categoryRepository: CategoryRepository,        
        private appService: AppService,
    ) {}

    get categories(): Category[] {return this.categoryRepository.xl;}   
    get currentLang(): Lang {return this.appService.currentLang.value;} 

    public ngOnInit(): void {
        this.currentCategoryId = this.categories[0]._id;
        this.langSubscription = this.appService.currentLang.subscribe(async lang => {
            try {
                this.ready = false;
                this.articleMainRepository.filterLang = lang._id;
                await this.articleMainRepository.load();
                this.buildArticles();
                this.ready = true; 
            } catch (err) {
                this.appService.showNotification(err, "error");
            }
        });        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    public buildArticles(): void {
        this.articles = this.articleMainRepository.xl.filter(a => (a.category as Category)._id === this.currentCategoryId);
    }
}
