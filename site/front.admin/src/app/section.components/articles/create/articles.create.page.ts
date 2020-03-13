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
import { UserRepository } from '../../../services/repositories/user.repository';
import { User } from '../../../model/user.model';
import { TagRepository } from '../../../services/repositories/tag.repository';
import { Tag } from '../../../model/tag.model';

@Component({
	selector: 'articles-create-page',
	templateUrl: './articles.create.page.html',	
})
export class ArticlesCreatePage extends ObjectPage<Article> implements OnInit {
	public x: Article | null = null;
	public homeUrl: string = "/catalogue/articles";
	public folder: string = "articles";
	public requiredFields: string[] = ["slug", "name", "user", "category", "lang"];
	public imgCopyWidth: number = 200;

	constructor(
		protected admlangRepository: AdmLangRepository,
        protected articleRepository: ArticleRepository,
        private langRepository: LangRepository,
		private categoryRepository: CategoryRepository,
		private userRepository: UserRepository,
		private tagRepository: TagRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,		
	) {
		super(admlangRepository, articleRepository, appService, router, uploadService);
    }
    
    get ll(): Lang[] {return this.langRepository.xlFull;}	
	get cl(): Category[] {return this.categoryRepository.xlFull;}	
	get ul(): User[] {return this.userRepository.xlFull;}
	get tl(): Tag[] {return this.tagRepository.xlFull;}

	public async ngOnInit(): Promise<void> {
		try {
			this.x = new Article().init();        
			await this.categoryRepository.loadFull();	
			await this.langRepository.loadFull();
			await this.userRepository.loadFull();
			await this.tagRepository.loadFull();
	
			if (this.ll.length) {
				this.appService.monitorLog("[articles create] page loaded");
				this.ready = true;
			} else {
				this.appService.monitorLog("no languages found", true);
			}		
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
		
	}
}
