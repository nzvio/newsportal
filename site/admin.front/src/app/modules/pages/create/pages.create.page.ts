
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LangRepository } from '../../../services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';
import { Page } from '../../../model/page.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { PageRepository } from '../../../services/repositories/page.repository';
import { AppService } from '../../../services/app.service';
import { UploadService } from '../../../services/upload.service';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'pages-create-page',
	templateUrl: './pages.create.page.html',	
})
export class PagesCreatePage extends ObjectPage<Page> implements OnInit {
	public x: Page | null = null;
	public homeUrl: string = "/pages";
	public folder: string = "pages";
	public requiredFields: string[] = ["slug"];
	public imgCopyWidth: number = 200;

	constructor(
		protected admlangRepository: AdmLangRepository,
        protected pageRepository: PageRepository,
        private langRepository: LangRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,		
	) {
		super(admlangRepository, pageRepository, appService, router, uploadService);
    }
    
    get ll(): Lang[] {return this.langRepository.xlFull;}	
	get pl(): Page[] {return this.pageRepository.xlFull;}	

	public async ngOnInit(): Promise<void> {
		try {
			this.x = new Page().init();        
			await this.pageRepository.loadFull();	
			await this.langRepository.loadFull();
	
			if (this.ll.length) {
				this.appService.monitorLog("[pages create] page loaded");
				this.ready = true;
			} else {
				this.appService.monitorLog("no languages found", true);
			}		
		} catch (err) {
			this.appService.monitorLog(err, true);
		}		
	}
}
