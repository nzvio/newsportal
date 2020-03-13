import { Component, Input } from '@angular/core';

import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Tag } from '../../model/tag.model';

@Component({
    selector: "the-tag",
    templateUrl: "./tag.component.html"
})
export class TagComponent extends ObjectComponent {    
    @Input() x: Tag;   
    @Input() ll: Lang[];     
}
