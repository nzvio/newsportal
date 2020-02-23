import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserRepository } from '../../../services/repositories/user.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { UsergroupRepository } from 'src/app/services/repositories/usergroup.repository';
import { Usergroup } from 'src/app/model/usergroup.model';

@Component({
	selector: 'users-list-page',
	templateUrl: './users.list.page.html',	
})
export class UsersListPage extends ListPage implements OnInit {
    constructor(
        protected userRepository: UserRepository, 
        private usergroupRepository: UsergroupRepository,       
        protected appService: AppService,
        private route: ActivatedRoute,        
    ) {      
        super(userRepository, appService);
    }    
    
    get ugl(): Usergroup[] {return this.usergroupRepository.xlFull;}

    public ngOnInit(): void {
        this.route.params.subscribe(async p => {
            try {
                await this.userRepository.loadChunk();
                await this.usergroupRepository.loadFull();
                this.appService.monitorLog("users page loaded");
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }
        });
    }       
}
