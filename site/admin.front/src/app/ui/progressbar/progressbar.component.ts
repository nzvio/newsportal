import { Component, Input } from '@angular/core';

@Component({
    selector: 'progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.scss']      
})
export class ProgressbarComponent {
    @Input() progress: number = 0;    
}
    