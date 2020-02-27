import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryRepository } from '../../../services/repositories/category.repository';
import { Article } from '../../../model/article.model';
import { ObjectPage } from '../../_object.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { ArticleRepository } from '../../../services/repositories/article.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { UploadService } from '../../../services/upload.service';
import { Lang } from '../../../model/lang.model';
import { Category } from '../../../model/category.model';

@Component({
	selector: 'articles-create-page',
	templateUrl: './articles.create.page.html',	
})
export class ArticlesCreatePage extends ObjectPage<Article> implements OnInit {
	public x: Article | null = null;
	public homeUrl: string = "/catalogue/articles";
	public folder: string = "articles";
	public requiredFields: string[] = ["slug", "name"];
	public imgCopyWidth: number = 200;

	constructor(
		protected admlangRepository: AdmLangRepository,
        protected articleRepository: ArticleRepository,
        private langRepository: LangRepository,
        private categoryRepository: CategoryRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,		
	) {
		super(admlangRepository, articleRepository, appService, router, uploadService);
    }
    
    get ll(): Lang[] {return this.langRepository.xlFull;}	
	get cl(): Category[] {return this.categoryRepository.xlFull;}	

	public async ngOnInit(): Promise<void> {
        this.x = new Article().init();        
		await this.categoryRepository.loadFull();	
		await this.langRepository.loadFull();

		if (this.ll.length) {
			this.appService.monitorLog("[articles create] page loaded");
			this.ready = true;
		} else {
			this.appService.monitorLog("no languages found", true);
		}		
	}
}
