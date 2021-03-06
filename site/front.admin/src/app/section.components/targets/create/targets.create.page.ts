import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryRepository } from '../../../services/repositories/category.repository';
import { Target } from '../../../model/orm/target.model';
import { ObjectPage } from '../../_object.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { TargetRepository } from '../../../services/repositories/target.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { Category } from '../../../model/orm/category.model';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { Donor } from '../../../model/orm/donor.model';

@Component({
	selector: 'targets-create-page',
	templateUrl: './targets.create.page.html',	
})
export class TargetsCreatePage extends ObjectPage<Target> implements OnInit {
	public x: Target | null = null;
	public homeUrl: string = "/parsing/targets";
	public folder: string | null = null;	
	public requiredFields: string[] = ["donor", "category", "lang"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected targetRepository: TargetRepository,
		private donorRepository: DonorRepository,
        private langRepository: LangRepository,
        private categoryRepository: CategoryRepository,
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, targetRepository, appService, router);
    }
	
	get dl(): Donor[] {return this.donorRepository.xlFull;}
    get ll(): Lang[] {return this.langRepository.xlFull;}	
	get cl(): Category[] {return this.categoryRepository.xlFull;}	

	public async ngOnInit(): Promise<void> {
		try {
			this.x = new Target().init();        
			await this.donorRepository.loadFull();	
			await this.categoryRepository.loadFull();	
			await this.langRepository.loadFull();
	
			if (this.ll.length) {
				this.appService.monitorLog("[targets create] page loaded");
				this.ready = true;
			} else {
				this.appService.monitorLog("no languages found", true);
			}		
		} catch (err) {
			this.appService.monitorLog(err, true);
		}		
	}
}
