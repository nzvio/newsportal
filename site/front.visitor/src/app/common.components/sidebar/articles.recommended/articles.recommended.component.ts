import { Component, OnInit, OnDestroy } from "@angular/core";

import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Subscription } from 'rxjs';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { ArticleRecommendedRepository } from '../../../services/repositories/article.recommended.repository';

@Component({
    selector: "articles-recommended",
    templateUrl: "./articles.recommended.component.html",
    styleUrls: ["./articles.recommended.component.scss"]
})
export class ArticlesRecommendedComponent implements OnInit, OnDestroy {    
    public ready: boolean = false;     
    private langSubscription: Subscription;

    constructor(
        private articleRecommendedRepository: ArticleRecommendedRepository,
        private langRepository: LangRepository,
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articleRecommendedRepository.xl;}    
    get currentLang(): Lang {return this.langRepository.current.value;}

    public ngOnInit(): void {
        this.langSubscription = this.langRepository.current.subscribe(async lang => {
            try {
                this.ready = false;
                this.articleRecommendedRepository.filterLang = lang._id;
                await this.articleRecommendedRepository.load();   
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }   
        });
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }    
}
