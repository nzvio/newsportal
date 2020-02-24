import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { UserRepository } from '../../../services/repositories/user.repository';
import { AppService } from '../../../services/app.service';
import { User } from '../../../model/user.model';
import { UploadService } from '../../../services/upload.service';
import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { Usergroup } from '../../../model/usergroup.model';
import { AuthService } from '../../../services/auth.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'users-edit-page',
	templateUrl: './users.edit.page.html',	
})
export class UsersEditPage extends ObjectPage<User> implements OnInit {
	public x: User | null = null;
	public homeUrl: string = "/users/users";
	public folder: string = "users";
	public requiredFields: string[] = ["name", "email", "usergroup"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected userRepository: UserRepository,
		private usergroupRepository: UsergroupRepository,
		protected appService: AppService,
		protected uploadService: UploadService,
		protected router: Router,
		private route: ActivatedRoute,	
		private authService: AuthService,	
	) {
		super(admlangRepository, userRepository, appService, router, uploadService);
	}

	get ugl(): Usergroup[] {return this.usergroupRepository.xlFull;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.ready = false;				
				this.x = await this.userRepository.loadOne(p["_id"]);
				await this.usergroupRepository.loadFull();
				this.appService.monitorLog("users edit page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}

	public async update(): Promise<boolean> {
		let res: boolean = await super.update();
		
		if (res && this.x._id === this.authService.authData.user._id) {
			this.authService.updateUser(this.x);
		}

		return res;
	}
}
