import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/usergroup.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'usergroups-edit-page',
	templateUrl: './usergroups.edit.page.html',	
})
export class UsergroupsEditPage extends ObjectPage<Usergroup> implements OnInit {
	public x: Usergroup | null = null;
	public homeUrl: string = "/users/usergroups";
	public folder: string | null = null;

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(admlangRepository, usergroupRepository, appService, router);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.ready = false;
				this.x = await this.usergroupRepository.loadOne(p["_id"]);
				this.appService.monitorLog("usergroups edit page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}
}
