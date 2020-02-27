import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../model/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { SlugService } from '../../services/slug.service';
import { Article } from '../../model/article.model';

@Component({
    selector: "the-article",
    templateUrl: "./article.component.html"
})
export class ArticleComponent extends ObjectComponent implements OnInit {    
    @Input() x: Article;   
    @Input() ll: Lang[]; 
    @Input() cl: Category[];    
    @Input() canBuildSlug: boolean = false;
    public tab: number = 1;     
    public selectedLang: Lang;   

    constructor(private slugService: SlugService) {
        super();
    }

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];        
    }
    
    public buildSlug(name: string): void {
        this.x.slug = this.slugService.buildSlug(name);
    }
}
