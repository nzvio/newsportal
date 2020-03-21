import { Component } from '@angular/core';

import { Lang } from '../../model/orm/lang.model';
import { AppService } from '../../services/app.service';

@Component({
    selector:"the-sidebar", 
    templateUrl: "./sidebar.component.html",     
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(private appService: AppService) {}    
    
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get facebookLink(): string {return this.currentLang.s("facebook");}
    get twitterLink(): string {return this.currentLang.s("twitter");}
}
