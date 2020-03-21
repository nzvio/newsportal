import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { ArticleByNameRepository } from '../../../services/repositories/article.byname.repository';
import { Article } from '../../../model/orm/article.model';

@Component({
    selector: "catalogue-search-page",
    templateUrl: "./catalogue.search.page.html",    
})
export class CatalogueSearchPage implements OnInit, OnDestroy, AfterViewInit {
    public articlesReady: boolean = false;
    public loadingMore: boolean = false;
    private searchSubscription: Subscription;
    
    constructor(
        private appService: AppService,
        private route: ActivatedRoute,        
        private articleByNameRepository: ArticleByNameRepository,   
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get searchKeyword(): string {return this.appService.searchKeyword.value;}
    get articles(): Article[] {return this.articleByNameRepository.xl;}
    get scrolledToBottom(): boolean {return this.appService.wrapper.scrollTop + this.appService.wrapper.offsetHeight > this.appService.wrapper.scrollHeight - 400;}	
    
    public ngOnInit(): void {        
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("search"));
            this.searchSubscription ? this.searchSubscription.unsubscribe() : null;            
            this.searchSubscription = this.appService.searchKeyword.subscribe(async s => {
                this.appService.wrapper ? this.appService.wrapper.scrollTop = 0 : null;
                this.articlesReady = false;		
                this.articleByNameRepository.xl = [];
				this.articleByNameRepository.currentPart = 0;
				this.articleByNameRepository.loadedAt = 0;
				this.articleByNameRepository.filterName = s;
                this.articleByNameRepository.filterLang = this.currentLang._id;
                
                try {
					await this.articleByNameRepository.load();					
					this.articlesReady = true;
				} catch (err) {
					this.appService.showNotification(err, "error");
				}
            });
        });        
    }    

    public ngOnDestroy(): void {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }

        if (this.appService.isBrowser && this.appService.wrapper) {
			this.appService.wrapper.removeEventListener("scroll", this.onScroll);
		}
    }

    public ngAfterViewInit(): void {
		if (this.appService.isBrowser) {
			setTimeout(() => {
				this.onScroll = this.onScroll.bind (this); 
				this.appService.wrapper.addEventListener("scroll", this.onScroll);
			}, 1);		
		}		
	}	

	private async onScroll(): Promise<void> {
		if (this.articlesReady && !this.loadingMore && this.scrolledToBottom && !this.articleByNameRepository.exhausted) {
			try {
				this.loadingMore = true;
				this.articleByNameRepository.currentPart++;
				await this.articleByNameRepository.load();
				this.loadingMore = false;
			} catch (err) {
				this.appService.showNotification(err, "error");
			}			
		}
	}
}
