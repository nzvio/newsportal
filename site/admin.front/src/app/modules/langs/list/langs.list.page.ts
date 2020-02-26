import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'langs-list-page',
	templateUrl: './langs.list.page.html',	
})
export class LangsListPage extends ListPage<Lang> implements OnInit {
    constructor(
        protected admlangRepository: AdmLangRepository,
        protected langRepository: LangRepository,         
        protected appService: AppService,        
    ) {      
        super(admlangRepository, langRepository, appService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            await this.langRepository.loadChunk();                
            this.appService.monitorLog("[langs] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
