import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';
import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/lang.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',	
})
export class HomePage implements OnInit {
	constructor(
		private appSerice: AppService,
		private langRepository: LangRepository,		
		private route: ActivatedRoute,
	) {}

	get currentLang(): Lang {return this.langRepository.current.value;}	

	public ngOnInit(): void {
		this.route.params.subscribe(p => {
			this.appSerice.setTitle(this.currentLang.s("home-title"));
			this.appSerice.setMeta("keywords", this.currentLang.s("home-keywords"));
			this.appSerice.setMeta("description", this.currentLang.s("home-description"));			
		});		
	}
}
