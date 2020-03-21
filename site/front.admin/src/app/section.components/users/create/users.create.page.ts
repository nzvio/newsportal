import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UserRepository } from '../../../services/repositories/user.repository';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { Usergroup } from '../../../model/orm/usergroup.model';
import { User } from '../../../model/orm/user.model';
import { UploadService } from '../../../services/upload.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'users-create-page',
	templateUrl: './users.create.page.html',	
})
export class UsersCreatePage extends ObjectPage<User> implements OnInit {
	public x: User | null = null;
	public homeUrl: string = "/users/users";
	public folder: string = "users";
	public requiredFields: string[] = ["name", "email", "password", "usergroup"];
	public imgCopyWidth: number = 150;

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected userRepository: UserRepository,
		private usergroupRepository: UsergroupRepository,     
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,		
	) {
		super(admlangRepository, userRepository, appService, router, uploadService);
	}

	get ugl(): Usergroup[] {return this.usergroupRepository.xlFull;}

	public async ngOnInit(): Promise<void> {
		try {
			this.ready = false;
			this.x = new User().init();
			await this.usergroupRepository.loadFull();
			this.appService.monitorLog("[users create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
