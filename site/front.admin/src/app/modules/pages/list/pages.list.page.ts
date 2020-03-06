import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { PageRepository } from '../../../services/repositories/page.repository';
import { Page } from '../../../model/page.model';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'pages-list-page',
	templateUrl: './pages.list.page.html',	
})
export class PagesListPage extends ListPage<Page> implements OnInit {
    // inherited
    public homeUrl: string = "/pages";
    // local
    public selectedLang: Lang | null = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected pageRepository: PageRepository, 
        private langRepository: LangRepository,        
        protected appService: AppService,        
    ) {      
        super(admlangRepository, pageRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlFull;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.pageRepository.loadChunk(); 
            await this.langRepository.loadFull();         
            
            if (this.ll.length) {
                this.selectedLang = this.ll[0];
                this.appService.monitorLog("[pages] page loaded");            
                this.ready = true;
            } else {
                this.appService.monitorLog("no languages found", true);
            }            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
