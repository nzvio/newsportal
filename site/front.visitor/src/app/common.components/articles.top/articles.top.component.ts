import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { ArticleTopRepository } from '../../services/repositories/article.top.repository';
import { Article } from 'src/app/model/article.model';
import { AppService } from 'src/app/services/app.service';
import { Lang } from 'src/app/model/lang.model';

@Component({
    selector: "articles-top",
    templateUrl: "./articles.top.component.html",
    styleUrls: ["./articles.top.component.scss"]
})
export class ArticlesTopComponent implements OnChanges {
    @Input() currentLang: Lang;
    public ready: boolean = false; 
    public articles: Article[] = [];   

    constructor(
        private articleTopRepository: ArticleTopRepository,
        private appService: AppService,
    ) {}    

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.currentLang) {            
            try {
                this.ready = false;
                await this.articleTopRepository.load(this.currentLang._id);
                this.buildArticles();
                this.ready = true; 
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
    }

    private buildArticles(): void {
        this.articles = this.articleTopRepository.lists.find(list => list.langId === this.currentLang._id).xl;
    }
}