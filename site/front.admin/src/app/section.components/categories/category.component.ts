import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../model/orm/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/orm/lang.model';
import { SlugService } from '../../services/slug.service';

@Component({
    selector: "the-category",
    templateUrl: "./category.component.html"
})
export class CategoryComponent extends ObjectComponent implements OnInit {    
    @Input() x: Category;   
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
