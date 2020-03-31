import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Lang } from '../../../model/orm/lang.model';
import { ArticleRepository } from '../../../services/repositories/article.repository';
import { AppService } from '../../../services/app.service';
import { Article } from '../../../model/orm/article.model';

@Component({
    selector: "articles-last",
    templateUrl: "./articles.last.component.html",
    styleUrls: ["./articles.last.component.scss"]
})
export class ArticlesLastComponent implements OnInit, OnDestroy {    
    public ready: boolean = false;  
    public reloading: boolean = false;
    private langSubscription: Subscription;

    constructor(
        private articleRepository: ArticleRepository,        
        private appService: AppService,
    ) {}  

    get articles(): Article[] {return this.articleRepository.xl;} 
    get fullLength(): number {return this.articleRepository.fullLength;}
    get length(): number {return this.articleRepository.chunkLength;}
    get currentPart(): number {return this.articleRepository.currentPart;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    
    public ngOnInit(): void {
        this.langSubscription = this.appService.currentLang.subscribe(async lang => {
            try {
                this.ready = false;
                this.articleRepository.filterLang = lang._id;
                this.articleRepository.currentPart = 0;
                await this.articleRepository.loadChunk();
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            } 
        });
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }
    
    public async setCurrentPart(i: number): Promise<void> {
        if (!this.reloading) {
            try {            
                this.reloading = true;
                this.articleRepository.currentPart = i;
                await this.articleRepository.loadChunk();            
                setTimeout(() => {this.reloading = false;}, 500);
            } catch (err) {
                this.appService.showNotification(err, "error");
            }     
        }        
    }

    public shareFb(article: Article): void {                        
        this.appService.shareFb(this.currentLang, article);        
    }

    public shareTw (article: Article): void {        
        this.appService.shareTw(this.currentLang, article);		
	}
}
