import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/lang.model';
import { UploadService } from '../../../services/upload.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'langs-edit-page',
	templateUrl: './langs.edit.page.html',	
})
export class LangsEditPage extends ObjectPage<Lang> implements OnInit {
	public x: Lang | null = null;
	public homeUrl: string = "/langs";
	public folder: string = "langs";
	public requiredFields: string[] = ["name", "slug"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, langRepository, appService, router, uploadService);
	}


	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.ready = false;				
				this.x = await this.langRepository.loadOne(p["_id"]);
				this.appService.monitorLog("[langs edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
