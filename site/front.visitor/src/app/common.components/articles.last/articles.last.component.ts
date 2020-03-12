import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
declare var FB: any;

import { Lang } from '../../model/lang.model';
import { ArticleRepository } from '../../services/repositories/article.repository';
import { AppService } from '../../services/app.service';
import { Article } from '../../model/article.model';
import { LangRepository } from '../../services/repositories/lang.repository';

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
        private langRepository: LangRepository,
        private appService: AppService,
    ) {}  

    get articles(): Article[] {return this.articleRepository.xl;} 
    get fullLength(): number {return this.articleRepository.fullLength;}
    get length(): number {return this.articleRepository.chunkLength;}
    get currentPart(): number {return this.articleRepository.currentPart;}
    get currentLang(): Lang {return this.langRepository.current.value;}

    public ngOnInit(): void {
        this.langSubscription = this.langRepository.current.subscribe(async lang => {
            try {
                this.ready = false;
                this.articleRepository.filterLang = lang._id;
                this.articleRepository.currentPart = 0;
                await this.articleRepository.load();   
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
                await this.articleRepository.load();            
                setTimeout(() => {this.reloading = false;}, 500);
            } catch (err) {
                this.appService.showNotification(err, "error");
            }     
        }        
    }

    public shareFb(article: Article): void {
        // TODO: move host and protocol to options and get them from repository
        let fbParam: Object = {method: 'share', href: `https://${window.location.host}/${this.currentLang.slug}/catalogue/category/${article.category.slug}/${article.slug}`};
        FB.ui (fbParam, response => {console.log (response)});
    }

    public shareTw (article: Article): void {
        // TODO: move host and protocol to options and get them from repository
		let url: string = `https://${window.location.host}/${this.currentLang.slug}/catalogue/category/${article.category.slug}/${article.slug}`;
		let text: string = article.name+" ("+article.source+")";
		window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text));		
	}
}
