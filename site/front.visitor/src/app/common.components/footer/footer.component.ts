import { Component } from '@angular/core';

import { Lang } from '../../model/orm/lang.model';
import { PageRepository } from '../../services/repositories/page.repository';
import { Page } from '../../model/orm/page.model';
import { AppService } from '../../services/app.service';

@Component({
    selector:"the-footer", 
    templateUrl: "./footer.component.html",     
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {   
    constructor(
        private appService: AppService,        
        private pageRepository: PageRepository,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get pages(): Page[] {return this.pageRepository.xl;}
    get url(): string[] {return this.appService.url;}    
}
