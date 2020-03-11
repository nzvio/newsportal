import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";

import { ArticleTopRepository } from '../../services/repositories/article.top.repository';
import { Article } from 'src/app/model/article.model';
import { AppService } from 'src/app/services/app.service';
import { Lang } from 'src/app/model/lang.model';

@Component({
    selector: "articles-top",
    templateUrl: "./articles.top.component.html",
    styleUrls: ["./articles.top.component.scss"]
})
export class ArticlesTopComponent implements OnChanges, OnInit {
    @Input() currentLang: Lang;
    public ready: boolean = false;     

    constructor(
        private articleTopRepository: ArticleTopRepository,
        private appService: AppService,
    ) {}    

    get articles(): Article[] {return this.articleTopRepository.xl;}

    public async ngOnInit(): Promise<void> {        
        await this.articleTopRepository.load(this.currentLang._id);                
        this.ready = true; 
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {        
        if (changes.currentLang && changes.currentLang.previousValue) { // not first time
            try {
                this.ready = false;
                await this.articleTopRepository.load(this.currentLang._id);   
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }            
        }
    }    
}