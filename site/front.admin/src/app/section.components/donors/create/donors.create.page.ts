import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { AppService } from '../../../services/app.service';
import { Donor } from '../../../model/orm/donor.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'donors-create-page',
	templateUrl: './donors.create.page.html',	
})
export class DonorsCreatePage extends ObjectPage<Donor> implements OnInit {
	public x: Donor | null = null;
	public homeUrl: string = "/parsing/donors";
	public folder: string | null = null;
	public requiredFields: string[] = ["name"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected donorRepository: DonorRepository,
        protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, donorRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new Donor().init();
		this.appService.monitorLog("[donors create] page loaded");
		this.ready = true;
	}
}
