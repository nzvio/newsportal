import { Component, Input } from '@angular/core';

import { Usergroup } from '../../model/orm/usergroup.model';
import { AdmLang } from '../../model/admlang.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-usergroup",
    templateUrl: "./usergroup.component.html"
})
export class UsergroupComponent extends ObjectComponent {
    @Input() currentLang: AdmLang;
    @Input() x: Usergroup;
}
