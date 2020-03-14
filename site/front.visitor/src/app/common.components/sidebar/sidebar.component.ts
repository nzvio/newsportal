import { Component } from '@angular/core';

import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/orm/lang.model';
import { SettingRepository } from '../../services/repositories/setting.repository';

@Component({
    selector:"the-sidebar", 
    templateUrl: "./sidebar.component.html",     
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(
        private langRepository: LangRepository,
        private settingRepository: SettingRepository,
    ) {}    
    
    get currentLang(): Lang {return this.langRepository.current.value;}
    get facebookLink(): string {return this.settingRepository.param("facebook");}
    get twitterLink(): string {return this.settingRepository.param("twitter");}
}
