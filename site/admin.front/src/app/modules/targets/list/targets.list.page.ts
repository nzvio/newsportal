import { Component, OnInit } from '@angular/core';

import { TargetRepository } from '../../../services/repositories/target.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Target } from '../../../model/target.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Donor } from '../../../model/donor.model';
import { Category } from '../../../model/category.model';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'targets-list-page',
	templateUrl: './targets.list.page.html',	
})
export class TargetsListPage extends ListPage<Target> implements OnInit {
    // inherited
    public homeUrl: string = "/parsing/targets";
    // local
    public selectedLang: Lang | null = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected targetRepository: TargetRepository,
        private donorRepository: DonorRepository,
        private categoryRepository: CategoryRepository,
        private langRepository: LangRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, targetRepository, appService);
    }    

    get dl(): Donor[] {return this.donorRepository.xlFull;}
    get cl(): Category[] {return this.categoryRepository.xlFull;}
    get ll(): Lang[] {return this.langRepository.xlFull;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.targetRepository.loadChunk();
            await this.donorRepository.loadFull();
            await this.categoryRepository.loadFull();
            await this.langRepository.loadFull();

            if (this.ll.length) {
                this.selectedLang = this.ll[0];
                this.appService.monitorLog("[targets] page loaded");            
                this.ready = true;
            } else {
                this.appService.monitorLog("no languages found", true);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
