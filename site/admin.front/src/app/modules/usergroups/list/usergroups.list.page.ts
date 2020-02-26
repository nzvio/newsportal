import { Component, OnInit } from '@angular/core';

import { UsergroupRepository } from '../../../services/repositories/usergroup.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Usergroup } from 'src/app/model/usergroup.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'usergroups-list-page',
	templateUrl: './usergroups.list.page.html',	
})
export class UsergroupsListPage extends ListPage<Usergroup> implements OnInit {
    constructor(
        protected admlangRepository: AdmLangRepository,
        protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, usergroupRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.usergroupRepository.loadChunk();
            this.appService.monitorLog("[usergroups] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
