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
	public previousLang: string = "";	

	constructor(
		private categoryRepository: CategoryRepository,
		private articleRepository: ArticleRepository,		
		private appService: AppService,
		private voteService: VoteService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	get currentLang(): Lang {return this.appService.currentLang.value;}
	
	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			this.categoryReady = false;
			this.articleReady = false;			
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
        this.voteService.voteForArticle(this.article, rating);
    }    
}
