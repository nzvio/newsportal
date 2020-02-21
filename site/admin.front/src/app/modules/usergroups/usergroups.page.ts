import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsergroupRepository } from '../../services/repositories/usergroup.repository';
import { AppService } from '../../services/app.service';
import { ListPage } from '../_list.page';

@Component({
	selector: 'usergroups-page',
	templateUrl: './usergroups.page.html',	
})
export class UsergroupsPage extends ListPage implements OnInit {
    constructor(
        protected usergroupRepository: UsergroupRepository,
        protected appService: AppService,
        private route: ActivatedRoute,        
    ) {      
        super(usergroupRepository, appService);
    }    
    
    public ngOnInit(): void {
        this.route.params.subscribe(async p => {
            try {
                await this.usergroupRepository.loadChunk();
                this.appService.monitorLog("usergroups data loaded");
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }
        });
    }       
}
