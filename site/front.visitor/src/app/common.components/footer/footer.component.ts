import { Component } from '@angular/core';

import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/lang.model';
import { PageRepository } from '../../services/repositories/page.repository';
import { Page } from '../../model/page.model';
import { AppService } from '../../services/app.service';

@Component({
    selector:"the-footer", 
    templateUrl: "./footer.component.html",     
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {   
    constructor(
        private appService: AppService,
        private langRepository: LangRepository,
        private pageRepository: PageRepository,
    ) {}

    get currentLang(): Lang {return this.langRepository.current;}
    get pages(): Page[] {return this.pageRepository.xl;}
    get url(): string[] {return this.appService.url;}    
}
