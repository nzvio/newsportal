import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/usergroup.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'usergroups-create-page',
	templateUrl: './usergroups.create.page.html',	
})
export class UsergroupsCreatePage extends ObjectPage<Usergroup> implements OnInit {
	public x: Usergroup | null = null;
	public homeUrl: string = "/users/usergroups";
	public folder: string | null = null;
	public requiredFields: string[] = ["name", "title"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, usergroupRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new Usergroup();
		this.appService.monitorLog("[usergroups create] page loaded");
		this.ready = true;
	}
}
