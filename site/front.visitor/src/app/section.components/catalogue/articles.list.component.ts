import { Component, Input } from "@angular/core";

import { Article } from '../../model/orm/article.model';
import { AppService } from '../../services/app.service';
import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/orm/lang.model';

@Component({
    selector: "articles-list",
    templateUrl: "./articles.list.component.html",
    styleUrls: ["./articles.list.component.scss"]
})
export class ArticlesListComponent {
    @Input() articlesReady: boolean = false;
    @Input() loadingMore: boolean = false;
    @Input() articles: Article[] = [];

    constructor(
        private appService: AppService,
        private langRepository: LangRepository,
    ) {}

    get currentLang(): Lang {return this.langRepository.current.value;}

    public shareFb(article: Article): void {                        
        this.appService.shareFb(this.currentLang, article);        
    }

    public shareTw (article: Article): void {        
        this.appService.shareTw(this.currentLang, article);		
	}
}
