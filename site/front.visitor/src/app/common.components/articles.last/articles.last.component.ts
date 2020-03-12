import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Lang } from '../../model/lang.model';
import { ArticleRepository } from '../../services/repositories/article.repository';
import { AppService } from '../../services/app.service';
import { Article } from '../../model/article.model';

@Component({
    selector: "articles-last",
    templateUrl: "./articles.last.component.html",
    styleUrls: ["./articles.last.component.scss"]
})
export class ArticlesLastComponent implements OnChanges {
    @Input() currentLang: Lang;
    public ready: boolean = false;  
    public reloading: boolean = false;

    constructor(
        private articleRepository: ArticleRepository,
        private appService: AppService,
    ) {}  

    get articles(): Article[] {return this.articleRepository.xl;} 
    get fullLength(): number {return this.articleRepository.fullLength;}
    get length(): number {return this.articleRepository.chunkLength;}
    get currentPart(): number {return this.articleRepository.currentPart;}

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {        
        if (changes.currentLang) {
            try {
                this.ready = false;
                this.articleRepository.filterLang = this.currentLang._id;
                this.articleRepository.currentPart = 0;
                await this.articleRepository.load();   
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
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
}
