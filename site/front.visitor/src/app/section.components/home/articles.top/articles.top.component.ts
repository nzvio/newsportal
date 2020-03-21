import { Component, OnInit, OnDestroy } from "@angular/core";

import { ArticleTopRepository } from '../../../services/repositories/article.top.repository';
import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Subscription } from 'rxjs';

@Component({
    selector: "articles-top",
    templateUrl: "./articles.top.component.html",
    styleUrls: ["./articles.top.component.scss"]
})
export class ArticlesTopComponent implements OnInit, OnDestroy {    
    public ready: boolean = false;     
    private langSubscription: Subscription;

    constructor(
        private articleTopRepository: ArticleTopRepository,        
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articleTopRepository.xl;}    
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.langSubscription = this.appService.currentLang.subscribe(async lang => {
            try {
                this.ready = false;
                this.articleTopRepository.filterLang = lang._id;
                await this.articleTopRepository.load();   
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
