import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { AppService } from '../../../services/app.service';
import { Category } from '../../../model/category.model';
import { UploadService } from '../../../services/upload.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/lang.model';
import { Article } from '../../../model/article.model';
import { ArticleRepository } from '../../../services/repositories/article.repository';

@Component({
	selector: 'articles-edit-page',
	templateUrl: './articles.edit.page.html',	
})
export class ArticlesEditPage extends ObjectPage<Article> implements OnInit {		
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
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, articleRepository, appService, router, uploadService);
	}

	get ll(): Lang[] {return this.langRepository.xlFull;}	
	get cl(): Category[] {return this.categoryRepository.xlFull;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.ready = false;				
				this.x = await this.articleRepository.loadOne(p["_id"]);				
				await this.categoryRepository.loadFull();								
				await this.langRepository.loadFull();

				if (this.ll.length) {
					this.appService.monitorLog("[articles edit] page loaded");
					this.ready = true;
				} else {
					this.appService.monitorLog("no languages found", true);
				}				
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
