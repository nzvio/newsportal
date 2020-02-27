
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LangRepository } from '../../../services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';
import { Category } from '../../../model/category.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { AppService } from '../../../services/app.service';
import { UploadService } from '../../../services/upload.service';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'categories-create-page',
	templateUrl: './categories.create.page.html',	
})
export class CategoriesCreatePage extends ObjectPage<Category> implements OnInit {
	public x: Category | null = null;
	public homeUrl: string = "/catalogue/categories";
	public folder: string = "categories";
	public requiredFields: string[] = ["slug"];
	public imgCopyWidth: number = 200;

	constructor(
		protected admlangRepository: AdmLangRepository,
        protected categoryRepository: CategoryRepository,
        private langRepository: LangRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,		
	) {
		super(admlangRepository, categoryRepository, appService, router, uploadService);
    }
    
    get ll(): Lang[] {return this.langRepository.xlFull;}	
	get cl(): Category[] {return this.categoryRepository.xlFull;}	

	public async ngOnInit(): Promise<void> {
        this.x = new Category().init();        
		await this.categoryRepository.loadFull();	
		await this.langRepository.loadFull();

		if (this.ll.length) {
			this.appService.monitorLog("[categories create] page loaded");
			this.ready = true;
		} else {
			this.appService.monitorLog("no languages found", true);
		}		
	}
}
