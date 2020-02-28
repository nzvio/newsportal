import { Component, OnInit } from '@angular/core';

import { DonorRepository } from '../../../services/repositories/donor.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Donor } from 'src/app/model/donor.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'donors-list-page',
	templateUrl: './donors.list.page.html',	
})
export class DonorsListPage extends ListPage<Donor> implements OnInit {
    // inherited
    public homeUrl: string = "/parsing/donors";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected donorRepository: DonorRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, donorRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.donorRepository.loadChunk();
            this.appService.monitorLog("[donors] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
