import { Component, Input } from '@angular/core';

import { User } from '../../model/orm/user.model';
import { Usergroup } from '../../model/orm/usergroup.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-user",
    templateUrl: "./user.component.html"
})
export class UserComponent extends ObjectComponent {    
    @Input() x: User | null = null;
    @Input() ugl: Usergroup[] = [];         
}
