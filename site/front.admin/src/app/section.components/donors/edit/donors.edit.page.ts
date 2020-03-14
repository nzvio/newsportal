import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { AppService } from '../../../services/app.service';
import { Donor } from '../../../model/orm/donor.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'donors-edit-page',
	templateUrl: './donors.edit.page.html',	
})
export class DonorsEditPage extends ObjectPage<Donor> implements OnInit {
	public x: Donor | null = null;
	public homeUrl: string = "/parsing/donors";
	public folder: string | null = null;
	public requiredFields: string[] = ["name"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected donorRepository: DonorRepository,
        protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,		
	) {
		super(admlangRepository, donorRepository, appService, router);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.ready = false;
				this.x = await this.donorRepository.loadOne(p["_id"]);
				this.appService.monitorLog("[donors edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}
}
