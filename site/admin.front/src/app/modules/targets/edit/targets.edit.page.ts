import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { TargetRepository } from '../../../services/repositories/target.repository';
import { AppService } from '../../../services/app.service';
import { Target } from '../../../model/target.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Category } from '../../../model/category.model';
import { Donor } from '../../../model/donor.model';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'targets-edit-page',
	templateUrl: './targets.edit.page.html',	
})
export class TargetsEditPage extends ObjectPage<Target> implements OnInit {
	public x: Target | null = null;
	public homeUrl: string = "/parsing/targets";
	public folder: string | null = null;	

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected targetRepository: TargetRepository,
		private donorRepository: DonorRepository,
        private categoryRepository: CategoryRepository,
        private langRepository: LangRepository,
        protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(admlangRepository, targetRepository, appService, router);
	}

	get dl(): Donor[] {return this.donorRepository.xlFull;}
    get cl(): Category[] {return this.categoryRepository.xlFull;}
    get ll(): Lang[] {return this.langRepository.xlFull;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.ready = false;
				this.x = await this.targetRepository.loadOne(p["_id"]);
				await this.donorRepository.loadFull();								
				await this.categoryRepository.loadFull();								
				await this.langRepository.loadFull();

				if (this.ll.length) {
					this.appService.monitorLog("[targets edit] page loaded");
					this.ready = true;
				} else {
					this.appService.monitorLog("no languages found", true);
				}					
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}
}
