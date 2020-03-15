import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleByCategoryRepository } from '../../../services/repositories/article.bycategory.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Category } from '../../../model/orm/category.model';
import { Article } from '../../../model/orm/article.model';

@Component({
	selector: 'catalogue-category-page',
	templateUrl: './catalogue.category.page.html',
	styleUrls: ['../catalogue.list.scss']
})
export class CatalogueCategoryPage implements OnInit, AfterViewInit, OnDestroy {		
	public category: Category | null = null;
	public categoryReady: boolean = false;
	public articlesReady: boolean = false;
	public loadingMore: boolean = false;

	constructor(
		private appService: AppService,
		private route: ActivatedRoute,
		private router: Router,
		private langRepository: LangRepository,
		private categoryRepository: CategoryRepository,
		private articleByCategoryRepository: ArticleByCategoryRepository
	) {}

	get currentLang(): Lang {return this.langRepository.current.value;}
	get articles(): Article[] {return this.articleByCategoryRepository.xl;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			this.categoryReady = false;
			this.articlesReady = false;			
			const slug: string = p["category"];
			const category: Category | null = this.categoryRepository.xl.find(x => x.slug === slug) || null;

			if (!category) {
				this.router.navigateByUrl("/404");
			} else {
				this.category = category;
				this.appService.setTitle(this.category.title[this.currentLang._id] || this.category.name[this.currentLang._id]);
				this.appService.setMeta("keywords", this.category.keywords[this.currentLang._id]);
				this.appService.setMeta("description", this.category.description[this.currentLang._id]);
				this.categoryReady = true;
				this.articleByCategoryRepository.xl = [];
				this.articleByCategoryRepository.currentPart = 0;
				this.articleByCategoryRepository.filterCategory = this.category._id;
				this.articleByCategoryRepository.filterLang = this.currentLang._id;

				try {
					await this.articleByCategoryRepository.load();
					this.articlesReady = true;
				} catch (err) {
					this.appService.showNotification(err, "error");
				}
			}
		});
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.onScroll = this.onScroll.bind (this); 
			this.appService.wrapper.addEventListener("scroll", this.onScroll);
		}, 1);		
	}

	public ngOnDestroy(): void {
		this.appService.wrapper.removeEventListener("scroll", this.onScroll);
	}

	private onScroll(): void {
		
	}
}
