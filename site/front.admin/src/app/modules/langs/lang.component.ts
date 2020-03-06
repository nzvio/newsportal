import { Component, Input } from '@angular/core';

import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Phrase } from '../../model/phrase';
import { AppService } from '../../services/app.service';

@Component({
    selector: "the-lang",
    templateUrl: "./lang.component.html"
})
export class LangComponent extends ObjectComponent {    
    @Input() x: Lang;
    public sortBy: string = "pos";
    public sortDir: number = 1;
    public tab: number = 1;

    constructor(private appService: AppService) {
        super();
    }

    public addPhrase(): void {
        this.x.phrases.unshift(new Phrase().init());
    }

    public deletePhrase(phrase: Phrase): void {
        this.x.phrases.splice(this.x.phrases.indexOf(phrase), 1);        
    }    

    public changeSorting(sortBy): void {
        if (sortBy === this.sortBy) {
            this.sortDir *= -1;            
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.appService.sort(this.x.phrases, this.sortBy, this.sortDir);        
    }
}
