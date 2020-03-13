import { Component, Input } from '@angular/core';

import { Donor } from '../../model/donor.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-donor",
    templateUrl: "./donor.component.html"
})
export class DonorComponent extends ObjectComponent {    
    @Input() x: Donor;
}
