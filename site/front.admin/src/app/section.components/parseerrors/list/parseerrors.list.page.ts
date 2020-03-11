import { Component, OnInit } from '@angular/core';

import { ParseerrorRepository } from '../../../services/repositories/parseerror.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Parseerror } from 'src/app/model/parseerror.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'parseerrors-list-page',
	templateUrl: './parseerrors.list.page.html',	
})
export class ParseerrorsListPage extends ListPage<Parseerror> implements OnInit {
    // inherited
    public homeUrl: string = "/parsing/parseerrors";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected parseerrorRepository: ParseerrorRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, parseerrorRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.parseerrorRepository.loadChunk();
            this.appService.monitorLog("[parseerrors] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
