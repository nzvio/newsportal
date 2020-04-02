import { Component, Input } from "@angular/core";

import { Article } from '../../model/orm/article.model';
import { AppService } from '../../services/app.service';
import { Lang } from '../../model/orm/lang.model';
import { VoteService } from '../../services/vote.service';

@Component({
    selector: "articles-list",
    templateUrl: "./articles.list.component.html",
    styleUrls: ["./articles.list.component.scss"]
})
export class ArticlesListComponent {
    @Input() articlesReady: boolean = false;
    @Input() loadingMore: boolean = false;
    @Input() articles: Article[] = [];
    @Input() displayUser: boolean = true;
    @Input() categoryAsLink: boolean = false;

    constructor(
        private appService: AppService,        
        private voteService: VoteService,      
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public shareFb(article: Article): void {                        
        this.appService.shareFb(this.currentLang, article);        
    }

    public shareTw (article: Article): void {        
        this.appService.shareTw(this.currentLang, article);		
    }    

    public vote(article: Article, rating: number): void {
        this.voteService.voteForArticle(article, rating);
    }    
}
