import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/usergroup.model';

@Component({
	selector: 'usergroups-edit-page',
	templateUrl: './usergroups.edit.page.html',	
})
export class UsergroupsEditPage extends ObjectPage implements OnInit {
    public x: Usergroup | null = null;

	constructor(
		protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(usergroupRepository, appService, router);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			this.ready = false;
			this.x = await this.usergroupRepository.loadOne(p["_id"]);
			this.appService.monitorLog("usergroups edit page loaded");
			this.ready = true;
		});
	}
}
