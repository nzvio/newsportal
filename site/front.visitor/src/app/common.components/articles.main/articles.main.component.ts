import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";

import { Article } from 'src/app/model/article.model';
import { AppService } from 'src/app/services/app.service';
import { Lang } from 'src/app/model/lang.model';
import { ArticleMainRepository } from '../../services/repositories/article.main.repository';
import { CategoryRepository } from '../../services/repositories/category.repository';
import { Category } from 'src/app/model/category.model';

@Component({
    selector: "articles-main",
    templateUrl: "./articles.main.component.html",
    styleUrls: ["./articles.main.component.scss"]
})
export class ArticlesMainComponent implements OnChanges, OnInit {
    @Input() currentLang: Lang;
    public currentCategoryId: string = "";
    public ready: boolean = false;    
    public articles: Article[] = [];

    constructor(
        private articleMainRepository: ArticleMainRepository,
        private categoryRepository: CategoryRepository,
        private appService: AppService,
    ) {}

    get categories(): Category[] {return this.categoryRepository.xl;}    

    public async ngOnInit(): Promise<void> {
        try {                
            this.currentCategoryId = this.categories[0]._id;
            await this.articleMainRepository.load(this.currentLang._id);
            this.buildArticles();
            this.ready = true; 
        } catch (err) {
            this.appService.showNotification(err, "error");
        }   
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.currentLang && changes.currentLang.previousValue) { // not first time!           
            try {
                this.ready = false;
                await this.articleMainRepository.load(this.currentLang._id);
                this.buildArticles();
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
    }

    public buildArticles(): void {
        this.articles = this.articleMainRepository.xl.filter(a => (a.category as Category)._id === this.currentCategoryId);
    }
}
