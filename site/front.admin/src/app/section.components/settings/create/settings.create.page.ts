import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { SettingRepository } from '../../../services/repositories/setting.repository';
import { AppService } from '../../../services/app.service';
import { Setting } from '../../../model/setting.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'settings-create-page',
	templateUrl: './settings.create.page.html',	
})
export class SettingsCreatePage extends ObjectPage<Setting> implements OnInit {
	public x: Setting | null = null;
	public homeUrl: string = "/settings";
	public folder: string | null = null;
	public requiredFields: string[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected settingRepository: SettingRepository,
        protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, settingRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new Setting().init();
		this.appService.monitorLog("[settings create] page loaded");
		this.ready = true;
	}
}
