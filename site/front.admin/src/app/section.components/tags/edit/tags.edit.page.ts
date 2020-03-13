import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { TagRepository } from '../../../services/repositories/tag.repository';
import { AppService } from '../../../services/app.service';
import { Tag } from '../../../model/tag.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'tags-edit-page',
	templateUrl: './tags.edit.page.html',	
})
export class TagsEditPage extends ObjectPage<Tag> implements OnInit {
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
		private route: ActivatedRoute,		
	) {
		super(admlangRepository, tagRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlFull;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.ready = false;
				this.x = await this.tagRepository.loadOne(p["_id"]);
				await this.langRepository.loadFull();
				this.appService.monitorLog("[tags edit] page loaded");
				this.ready = true;				
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}
}
