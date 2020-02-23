import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/usergroup.model';

@Component({
	selector: 'usergroups-create-page',
	templateUrl: './usergroups.create.page.html',	
})
export class UsergroupsCreatePage extends ObjectPage<Usergroup> implements OnInit {
	public x: Usergroup | null = null;
	public homeUrl: string = "/users/usergroups";
	public folder: string | null = null;

	constructor(
		protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(usergroupRepository, appService, router);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(p => {
			this.ready = false;
			this.x = new Usergroup().init();
			this.appService.monitorLog("usergroups create page loaded");
			this.ready = true;
		});
	}
}
