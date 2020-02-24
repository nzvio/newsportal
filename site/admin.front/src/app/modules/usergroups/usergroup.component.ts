import { Component, Input } from '@angular/core';
import { Usergroup } from '../../model/usergroup.model';
import { AdmLang } from 'src/app/model/admlang.model';

@Component({
    selector: "the-usergroup",
    templateUrl: "./usergroup.component.html"
})
export class UsergroupComponent {
    @Input() currentLang: AdmLang;
    @Input() x: Usergroup;
}