import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../model/orm/user.model';
import { UserRepository } from '../../../services/repositories/user.repository';
import { AppService } from '../../../services/app.service';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';
import { ArticleByUserRepository } from '../../../services/repositories/article.byuser.repository';
import { Article } from '../../../model/orm/article.model';

@Component({
	selector: 'catalogue-user-page',
	templateUrl: './catalogue.user.page.html',
	styleUrls: ['./catalogue.user.page.scss']
})
export class CatalogueUserPage implements OnInit, AfterViewInit, OnDestroy {	
	public user: User | null = null;
	public userReady: boolean = false;
	public articlesReady: boolean = false;
	public loadingMore: boolean = false;

	constructor(
		private appService: AppService,
		private route: ActivatedRoute,		
		private langRepository: LangRepository,
		private userRepository: UserRepository,
		private articleByUserRepository: ArticleByUserRepository,
	) {}

	get currentLang(): Lang {return this.langRepository.current.value;}
	get articles(): Article[] {return this.articleByUserRepository.xl;}
	get scrolledToBottom(): boolean {return this.appService.wrapper.scrollTop + this.appService.wrapper.offsetHeight > this.appService.wrapper.scrollHeight - 400;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			this.user = null;
			this.userReady = false;
			this.articlesReady = false;			
			const _id: string = p["user"];

			try {
				this.user = await this.userRepository.getOne(_id);
				
				if (this.user) {
					this.appService.setTitle(this.user.name);
					this.userReady = true;
					this.articleByUserRepository.xl = [];
					this.articleByUserRepository.currentPart = 0;
					this.articleByUserRepository.loadedAt = 0;
					this.articleByUserRepository.filterUser = this.user._id;
					this.articleByUserRepository.filterLang = this.currentLang._id;
					await this.articleByUserRepository.load();					
					this.articlesReady = true;
				}				
			} catch (err) {								
				this.appService.showNotification(err, "error");				
			}
		});
	}

	public ngAfterViewInit(): void {
		if (this.appService.isBrowser) {
			setTimeout(() => {
				this.onScroll = this.onScroll.bind (this); 
				this.appService.wrapper.addEventListener("scroll", this.onScroll);
			}, 1);		
		}		
	}

	public ngOnDestroy(): void {
		if (this.appService.isBrowser && this.appService.wrapper) {
			this.appService.wrapper.removeEventListener("scroll", this.onScroll);
		}
	}

	private async onScroll(): Promise<void> {
		if (this.articlesReady && !this.loadingMore && this.scrolledToBottom && !this.articleByUserRepository.exhausted) {
			try {
				this.loadingMore = true;
				this.articleByUserRepository.currentPart++;
				await this.articleByUserRepository.load();
				this.loadingMore = false;
			} catch (err) {
				this.appService.showNotification(err, "error");
			}			
		}
	}		
}
