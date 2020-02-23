import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UserRepository } from '../../../services/repositories/user.repository';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/usergroup.model';
import { User } from '../../../model/user.model';
import { UploadService } from 'src/app/services/upload.service';

@Component({
	selector: 'users-create-page',
	templateUrl: './users.create.page.html',	
})
export class UsersCreatePage extends ObjectPage implements OnInit {
	public x: User | null = null;

	constructor(
		protected userRepository: UserRepository,
		private usergroupRepository: UsergroupRepository,     
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(userRepository, appService, router, "/users/users", "users", uploadService);
	}

	get ugl(): Usergroup[] {return this.usergroupRepository.xlFull;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.ready = false;
				this.x = new User().init();
				await this.usergroupRepository.loadFull();
				this.appService.monitorLog("users create page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}
}
