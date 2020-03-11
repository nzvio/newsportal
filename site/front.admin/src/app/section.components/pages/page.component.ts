import { Component, Input, OnInit } from '@angular/core';

import { Page } from '../../model/page.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { SlugService } from '../../services/slug.service';

@Component({
    selector: "the-page",
    templateUrl: "./page.component.html"
})
export class PageComponent extends ObjectComponent implements OnInit {    
    @Input() x: Page;   
    @Input() ll: Lang[]; 
    @Input() pl: Page[];    
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
