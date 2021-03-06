import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageRepository } from '../../services/repositories/page.repository';
import { Page } from '../../model/orm/page.model';
import { AppService } from '../../services/app.service';
import { Lang } from '../../model/orm/lang.model';

@Component({
	selector: 'static-page',
	templateUrl: './static.page.html',	
})
export class StaticPage implements OnInit {	
	public page: Page | null = null;
	public pageReady: boolean = false;

	constructor(
		private pageRepository: PageRepository,		
		private route: ActivatedRoute,
		private router: Router,
		private appService: AppService,
	) {}

	get currentLang(): Lang {return this.appService.currentLang.value;}

	public ngOnInit(): void {
		this.route.params.subscribe(p => {
			this.pageReady = false;
			let slug = p['page'];
			this.page = this.pageRepository.xl.find(x => x.slug === slug) || null;

			if (!this.page) {
				this.router.navigateByUrl("/404");
			} else {
				this.appService.setTitle(this.page.title[this.currentLang._id] || this.page.name[this.currentLang._id]);
				this.appService.setMeta("keywords", this.page.keywords[this.currentLang._id]);
				this.appService.setMeta("description", this.page.description[this.currentLang._id]);
				this.pageReady = true;
			}			
		});
	}
}
