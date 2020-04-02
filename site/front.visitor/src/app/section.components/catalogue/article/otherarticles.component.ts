import { Component, Input, OnInit } from "@angular/core";

import { ArticleByCategoryRepository } from '../../../services/repositories/article.bycategory.repository';
import { ArticleByUserRepository } from '../../../services/repositories/article.byuser.repository';
import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Category } from '../../../model/orm/category.model';

@Component({
    selector: "other-articles",
    templateUrl: "./otherarticles.component.html",
    styleUrls: ["./otherarticles.component.scss"],
})
export class OtherArticlesComponent implements OnInit {
    @Input() article: Article;
    @Input() category: Category;
    public articlesByCategoryReady: boolean = false;
	public articlesByUserReady: boolean = false;
    public otherBy: string = "category";
    
    constructor(
        private articleByCategoryRepository: ArticleByCategoryRepository,
        private articleByUserRepository: ArticleByUserRepository,
        private appService: AppService,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
	get articlesByCategory(): Article[] {return this.articleByCategoryRepository.xl;}
    get articlesByUser(): Article[] {return this.articleByUserRepository.xl;}
    
    public async ngOnInit(): Promise<void> {
        this.articleByCategoryRepository.filterLang = this.currentLang._id;
        this.articleByCategoryRepository.filterCategory = this.category._id;
        this.articleByCategoryRepository.filterExcludeId = this.article._id;
        this.articleByCategoryRepository.xl = [];
        this.articleByCategoryRepository.currentPart = 0;
        this.articleByCategoryRepository.loadedAt = 0;					
        this.articleByCategoryRepository
            .load()
            .then(() => {this.articlesByCategoryReady = true})
            .catch(err => {this.appService.showNotification(err, "error");});					

        if (this.article.user) {
            this.articleByUserRepository.filterLang = this.currentLang._id;
            this.articleByUserRepository.filterUser = this.article.user._id;
            this.articleByUserRepository.filterExcludeId = this.article._id;
            this.articleByUserRepository.xl = [];
            this.articleByUserRepository.currentPart = 0;
            this.articleByUserRepository.loadedAt = 0;
            this.articleByUserRepository
                .load()
                .then(() => {this.articlesByUserReady = true})
                .catch(err => {this.appService.showNotification(err, "error");});					
        }
    }
}
