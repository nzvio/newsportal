import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { PageRepository } from '../../../services/repositories/page.repository';
import { AppService } from '../../../services/app.service';
import { Page } from '../../../model/orm/page.model';
import { UploadService } from '../../../services/upload.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';

@Component({
	selector: 'pages-edit-page',
	templateUrl: './pages.edit.page.html',	
})
export class PagesEditPage extends ObjectPage<Page> implements OnInit {		
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
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, pageRepository, appService, router, uploadService);
	}

	get ll(): Lang[] {return this.langRepository.xlFull;}	
	get pl(): Page[] {return this.pageRepository.xlFull;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.ready = false;				
				this.x = await this.pageRepository.loadOne(p["_id"]);				
				await this.pageRepository.loadFull();				
				await this.langRepository.loadFull();

				if (this.ll.length) {
					this.appService.monitorLog("[pages edit] page loaded");
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
