import { Component, Input, OnInit } from '@angular/core';

import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/orm/lang.model';
import { Tag } from '../../model/orm/tag.model';

@Component({
    selector: "the-tag",
    templateUrl: "./tag.component.html"
})
export class TagComponent extends ObjectComponent implements OnInit {    
    @Input() x: Tag;   
    @Input() ll: Lang[];    
    public selectedLang: Lang; 

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];        
    }
}
