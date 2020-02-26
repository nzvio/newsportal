import { Component, Input, OnInit } from '@angular/core';

import { Page } from '../../model/page.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';

@Component({
    selector: "the-page",
    templateUrl: "./page.component.html"
})
export class PageComponent extends ObjectComponent implements OnInit {    
    @Input() x: Page;   
    @Input() ll: Lang[]; 
    @Input() pl: Page[];    
    public tab: number = 1;    
    public selectedLang: Lang;

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];
    }
}
