import { Component, Input } from '@angular/core';
import { Usergroup } from '../../model/usergroup.model';
import { AdmLang } from 'src/app/model/admlang.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-usergroup",
    templateUrl: "./usergroup.component.html"
})
export class UsergroupComponent extends ObjectComponent {
    @Input() currentLang: AdmLang;
    @Input() x: Usergroup;
}
