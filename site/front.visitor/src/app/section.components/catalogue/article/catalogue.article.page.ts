import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryRepository } from '../../../services/repositories/category.repository';
import { ArticleRepository } from '../../../services/repositories/article.repository';
import { AppService } from '../../../services/app.service';
import { Article } from '../../../model/orm/article.model';
import { Category } from '../../../model/orm/category.model';
import { Lang } from '../../../model/orm/lang.model';
import { IArticleGetDTO } from '../../../model/dto/article.get.dto';
import { VoteService } from '../../../services/vote.service';
import { ArticleByCategoryRepository } from '../../../services/repositories/article.bycategory.repository';
import { ArticleByUserRepository } from '../../../services/repositories/article.byuser.repository';

@Component({
	selector: 'catalogue-article-page',
	templateUrl: './catalogue.article.page.html',
	styleUrls: ['./catalogue.article.page.scss']
})
export class CatalogueArticlePage implements OnInit {
	public category: Category | null = null;
	public categoryReady: boolean = false;
	public article: Article | null = null;
	public articleReady: boolean = false;
	public articlesByCategoryReady: boolean = false;
	public articlesByUserReady: boolean = false;
	public previousLang: string = "";
	public otherBy: string = "category";

	constructor(
		private categoryRepository: CategoryRepository,
		private articleRepository: ArticleRepository,
		private articleByCategoryRepository: ArticleByCategoryRepository,
		private articleByUserRepository: ArticleByUserRepository,
		private appService: AppService,
		private voteService: VoteService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	get currentLang(): Lang {return this.appService.currentLang.value;}
	get articlesByCategory(): Article[] {return this.articleByCategoryRepository.xl;}
	get articlesByUser(): Article[] {return this.articleByUserRepository.xl;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			this.categoryReady = false;
			this.articleReady = false;
			this.articlesByCategoryReady = false;
			this.articlesByUserReady = false;
			const categorySlug: string = p["category"];
			const articleSlug: string = p["article"];
			this.category = this.categoryRepository.xl.find(x => x.slug === categorySlug) || null;

			if (!this.category) {
				this.router.navigateByUrl("/404");
			} else if (this.previousLang && this.previousLang !== this.currentLang._id) { 
				this.router.navigateByUrl(`/${this.currentLang.slug}/catalogue/category/${this.category.slug}`);
			} else {				
				try {
					this.previousLang = this.currentLang._id;
					this.categoryReady = true;
					const dto: IArticleGetDTO = {slug: articleSlug, lang: this.currentLang._id};
					this.article = await this.articleRepository.loadOne(dto);
					this.appService.setTitle(this.article.title || this.article.name);
					this.appService.setMeta("keywords", this.article.keywords);
					this.appService.setMeta("description", this.article.description);
					this.article.viewsq++;					
					this.articleReady = true;
					this.articleRepository.increaseViewsq(this.article._id);
					// other articles
					this.articleByCategoryRepository.filterLang = this.currentLang._id;
					this.articleByCategoryRepository.filterCategory = this.category._id;
					this.articleByCategoryRepository.filterExcludeId = this.article._id;
					this.articleByCategoryRepository.xl = [];
					this.articleByCategoryRepository.currentPart = 0;
					this.articleByCategoryRepository.loadedAt = 0;					
					this.articleByCategoryRepository.load().then(() => {this.articlesByCategoryReady = true});					

					if (this.article.user) {
						this.articleByUserRepository.filterLang = this.currentLang._id;
						this.articleByUserRepository.filterUser = this.article.user._id;
						this.articleByUserRepository.filterExcludeId = this.article._id;
						this.articleByUserRepository.xl = [];
						this.articleByUserRepository.currentPart = 0;
						this.articleByUserRepository.loadedAt = 0;
						this.articleByUserRepository.load().then(() => {this.articlesByUserReady = true});					
					}
				} catch (err) {					
					(err === "article not found") ? this.router.navigateByUrl("/404") : this.appService.showNotification(err, "error");					
				}				
			}
		});
	}

	public shareFb(): void {                        
        this.appService.shareFb(this.currentLang, this.article);        
    }

    public shareTw (): void {        
        this.appService.shareTw(this.currentLang, this.article);		
	}  
	
	public vote(rating: number): void {
        this.voteService.vote(this.article, rating);
    }    
}
