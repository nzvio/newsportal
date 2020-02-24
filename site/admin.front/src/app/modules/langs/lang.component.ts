import { Component, Input } from '@angular/core';

import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Phrase } from 'src/app/model/phrase';

@Component({
    selector: "the-lang",
    templateUrl: "./lang.component.html"
})
export class LangComponent extends ObjectComponent {    
    @Input() x: Lang;

    public addPhrase(): void {
        this.x.phrases.push(new Phrase().init());
    }

    public deletePhrase(phrase: Phrase): void {
        this.x.phrases.splice(this.x.phrases.indexOf(phrase), 1);        
    }

    public onPosChanged(): void {
        this.x.phrases.sort((a, b) => a.pos - b.pos);
    }
}
