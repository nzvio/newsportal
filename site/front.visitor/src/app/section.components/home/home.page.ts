import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';
import { Lang } from '../../model/orm/lang.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',	
})
export class HomePage implements OnInit {
	constructor(
		private appService: AppService,		
		private route: ActivatedRoute,
	) {}

	get currentLang(): Lang {return this.appService.currentLang.value;}	

	public ngOnInit(): void {
		this.route.params.subscribe(p => {
			this.appService.setTitle(this.currentLang.s("home-title"));
			this.appService.setMeta("keywords", this.currentLang.s("home-keywords"));
			this.appService.setMeta("description", this.currentLang.s("home-description"));			
		});		
	}
}
