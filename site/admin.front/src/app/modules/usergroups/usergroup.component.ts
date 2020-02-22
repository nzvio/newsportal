import { Component, Input } from '@angular/core';
import { Usergroup } from '../../model/usergroup.model';

@Component({
    selector: "the-usergroup",
    templateUrl: "./usergroup.component.html"
})
export class UsergroupComponent {
    @Input() x: Usergroup;
}