import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleByTagRepository } from '../../../services/repositories/article.bytag.repository';
import { TagRepository } from '../../../services/repositories/tag.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Tag } from '../../../model/orm/tag.model';
import { Article } from '../../../model/orm/article.model';

@Component({
	selector: 'catalogue-tag-page',
	templateUrl: './catalogue.tag.page.html',	
})
export class CatalogueTagPage implements OnInit, AfterViewInit, OnDestroy {		
	public tag: Tag | null = null;
	public tagReady: boolean = false;
	public articlesReady: boolean = false;
	public loadingMore: boolean = false;

	constructor(
		private appService: AppService,
		private route: ActivatedRoute,
		private router: Router,
		private langRepository: LangRepository,
		private tagRepository: TagRepository,
		private articleByTagRepository: ArticleByTagRepository
	) {}

	get currentLang(): Lang {return this.langRepository.current.value;}
	get articles(): Article[] {return this.articleByTagRepository.xl;}
	get scrolledToBottom(): boolean {return this.appService.wrapper.scrollTop + this.appService.wrapper.offsetHeight > this.appService.wrapper.scrollHeight - 400;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.tagReady = false;
				this.articlesReady = false;			
				const tagId: string = p["tag"];
				await this.tagRepository.load();
				const tag: Tag | null = this.tagRepository.xl.find(x => x._id === tagId) || null;

				if (!tag) {
					this.router.navigateByUrl("/404");
				} else {
					this.tag = tag;
					this.appService.setTitle(this.appService.capitalize(this.tag.name[this.currentLang._id]));
					this.tagReady = true;
					this.articleByTagRepository.xl = [];
					this.articleByTagRepository.currentPart = 0;
					this.articleByTagRepository.loadedAt = 0;
					this.articleByTagRepository.filterTag = this.tag._id;
					this.articleByTagRepository.filterLang = this.currentLang._id;
					await this.articleByTagRepository.load();					
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
		if (this.articlesReady && !this.loadingMore && this.scrolledToBottom && !this.articleByTagRepository.exhausted) {
			try {
				this.loadingMore = true;
				this.articleByTagRepository.currentPart++;
				await this.articleByTagRepository.load();
				this.loadingMore = false;
			} catch (err) {
				this.appService.showNotification(err, "error");
			}			
		}
	}	
}
