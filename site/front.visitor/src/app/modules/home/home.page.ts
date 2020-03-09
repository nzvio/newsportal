import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';
import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/lang.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleTopRepository } from '../../services/repositories/article.top.repository';
import { Article } from '../../model/article.model';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {	
	public topReady: boolean = false;	
	
	constructor(
		private appSerice: AppService,
		private langRepository: LangRepository,
		private articleTopRepository: ArticleTopRepository,
		private route: ActivatedRoute,
	) {}

	get currentLang(): Lang {return this.langRepository.current;}	
	get articlesTop(): Article[] {return this.articleTopRepository.xl;}

	public ngOnInit(): void {
		this.route.params.subscribe(p => {
			this.appSerice.setTitle(this.currentLang.s("home-title"));
			this.appSerice.setMeta("keywords", this.currentLang.s("home-keywords"));
			this.appSerice.setMeta("description", this.currentLang.s("home-description"));						
			this.topReady = false;			
			this.articleTopRepository
				.load(this.currentLang._id)
				.then(() => {this.topReady = true;})
				.catch(err => this.appSerice.showNotification(err.message, "error"));
		});		
	}
}
