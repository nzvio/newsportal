import { Component, Input } from '@angular/core';

import { Setting } from '../../model/orm/setting.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-setting",
    templateUrl: "./setting.component.html"
})
export class SettingComponent extends ObjectComponent {    
    @Input() x: Setting;
}
