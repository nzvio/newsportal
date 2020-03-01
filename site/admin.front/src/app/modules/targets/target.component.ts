import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../model/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Target } from '../../model/target.model';
import { Donor } from '../../model/donor.model';

@Component({
    selector: "the-target",
    templateUrl: "./target.component.html"
})
export class TargetComponent extends ObjectComponent implements OnInit {    
    @Input() x: Target;   
    @Input() ll: Lang[]; 
    @Input() cl: Category[];    
    @Input() dl: Donor[];    
    
    public tab: number = 1;     
    public selectedLang: Lang;   
    
    public ngOnInit(): void {
        this.selectedLang = this.ll[0];        
    }    
}
