import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../model/orm/user.model';
import { UserRepository } from '../../../services/repositories/user.repository';
import { AppService } from '../../../services/app.service';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';

@Component({
	selector: 'catalogue-user-page',
	templateUrl: './catalogue.user.page.html',
	styleUrls: ['./catalogue.user.page.scss']
})
export class CatalogueUserPage implements OnInit {	
	public user: User | null = null;
	public userReady: boolean = false;
	public articlesReady: boolean = false;
	public loadingMore: boolean = false;

	constructor(
		private appService: AppService,
		private route: ActivatedRoute,		
		private langRepository: LangRepository,
		private userRepository: UserRepository,
	) {}

	get currentLang(): Lang {return this.langRepository.current.value;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			this.userReady = false;
			this.articlesReady = false;			
			const _id: string = p["user"];

			try {
				this.user = await this.userRepository.getOne(_id);
				this.userReady = true;
			} catch (err) {								
				this.appService.showNotification(err, "error");				
			}
		});
	}
}
