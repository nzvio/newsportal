import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tag } from '../../../model/orm/tag.model';
import { ObjectPage } from '../../_object.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { TagRepository } from '../../../services/repositories/tag.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';

@Component({
	selector: 'tags-create-page',
	templateUrl: './tags.create.page.html',	
})
export class TagsCreatePage extends ObjectPage<Tag> implements OnInit {
	public x: Tag | null = null;
	public homeUrl: string = "/catalogue/tags";
	public folder: string | null = null;	
	public requiredFields: string[] = ["name", "lang"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected tagRepository: TagRepository,
		private langRepository: LangRepository,        
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, tagRepository, appService, router);
    }	
	
    get ll(): Lang[] {return this.langRepository.xlFull;}		

	public async ngOnInit(): Promise<void> {
		try {
			this.x = new Tag().init();        
			await this.langRepository.loadFull();
			this.appService.monitorLog("[tags create] page loaded");
			this.ready = true;			
		} catch (err) {
			this.appService.monitorLog(err, true);
		}		
	}
}
