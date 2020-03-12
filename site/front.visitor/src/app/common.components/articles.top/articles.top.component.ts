import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";

import { ArticleTopRepository } from '../../services/repositories/article.top.repository';
import { Article } from '../../model/article.model';
import { AppService } from '../../services/app.service';
import { Lang } from '../../model/lang.model';

@Component({
    selector: "articles-top",
    templateUrl: "./articles.top.component.html",
    styleUrls: ["./articles.top.component.scss"]
})
export class ArticlesTopComponent implements OnChanges {
    @Input() currentLang: Lang;
    public ready: boolean = false;     

    constructor(
        private articleTopRepository: ArticleTopRepository,
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articleTopRepository.xl;}    

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {        
        if (changes.currentLang) {
            try {
                this.ready = false;
                this.articleTopRepository.filterLang = this.currentLang._id;
                await this.articleTopRepository.load();   
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
    }    
}