import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserRepository } from '../../../services/repositories/user.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';

@Component({
	selector: 'users-list-page',
	templateUrl: './users.list.page.html',	
})
export class UsersListPage extends ListPage implements OnInit {
    constructor(
        protected userRepository: UserRepository,
        protected appService: AppService,
        private route: ActivatedRoute,        
    ) {      
        super(userRepository, appService);
    }    
    
    public ngOnInit(): void {
        this.route.params.subscribe(async p => {
            try {
                await this.userRepository.loadChunk();
                this.appService.monitorLog("users page loaded");
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }
        });
    }       
}
