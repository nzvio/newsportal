import { Component } from '@angular/core';

import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/orm/lang.model';

@Component({
    selector:"the-sidebar", 
    templateUrl: "./sidebar.component.html",     
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(private langRepository: LangRepository) {}    
    
    get currentLang(): Lang {return this.langRepository.current.value;}
    get facebookLink(): string {return this.currentLang.s("facebook");}
    get twitterLink(): string {return this.currentLang.s("twitter");}
}
