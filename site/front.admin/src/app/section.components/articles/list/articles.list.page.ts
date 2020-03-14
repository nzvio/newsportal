import { Component, OnInit } from '@angular/core';

import { ListPage } from '../../_list.page';
import { Article } from '../../../model/orm/article.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { ArticleRepository } from '../../../services/repositories/article.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Category } from '../../../model/orm/category.model';

@Component({
	selector: 'articles-list-page',
	templateUrl: './articles.list.page.html',	
})
export class ArticlesListPage extends ListPage<Article> implements OnInit {    
    // inherited
    public homeUrl: string = "/catalogue/articles";    
    // local
    public selectedLang: Lang | null = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected articleRepository: ArticleRepository, 
        private langRepository: LangRepository,        
        private categoryRepository: CategoryRepository,        
        protected appService: AppService,        
    ) {      
        super(admlangRepository, articleRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlFull;}
    get cl(): Category[] {return this.categoryRepository.xlFull;}
    get filterDate(): Date | null {return this.articleRepository.filterDate;}
    set filterDate(v: Date | null) {this.articleRepository.filterDate = v;}
    get filterName(): string {return this.articleRepository.filterName;}
    set filterName(v: string) {this.articleRepository.filterName = v;}
    get filterCategory(): string | null {return this.articleRepository.filterCategory;}
    set filterCategory(v: string | null) {this.articleRepository.filterCategory = v;}
    get filterLang(): string | null {return this.articleRepository.filterLang;}
    set filterLang(v: string | null) {this.articleRepository.filterLang = v;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.articleRepository.loadChunk();             
            await this.categoryRepository.loadFull(); 
            await this.langRepository.loadFull();     
            
            if (this.ll.length) {
                this.selectedLang = this.ll[0];
                this.appService.monitorLog("[articles] page loaded");
                this.ready = true;
            } else {
                this.appService.monitorLog("no languages found", true);
            }            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
