import { Component, Input } from '@angular/core';

import { Donor } from '../../model/donor.model';
import { AdmLang } from '../../model/admlang.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-donor",
    templateUrl: "./donor.component.html"
})
export class DonorComponent extends ObjectComponent {
    @Input() currentLang: AdmLang;
    @Input() x: Donor;
}
