import { Component, OnInit } from '@angular/core';

import { ObjectPage } from '../../_object.page';
import { Lang } from '../../../model/lang.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
	selector: 'langs-create-page',
	templateUrl: './langs.create.page.html',	
})
export class LangsCreatePage extends ObjectPage<Lang> implements OnInit {
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
	) {
		super(admlangRepository, langRepository, appService, router, uploadService);
	}

	public ngOnInit(): void {
		this.x = new Lang().init();
		this.appService.monitorLog("langs create page loaded");
		this.ready = true;
	}
}
