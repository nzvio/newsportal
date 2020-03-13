import { Component, OnInit } from '@angular/core';

import { TagRepository } from '../../../services/repositories/tag.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Tag } from '../../../model/tag.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/lang.model';

@Component({
	selector: 'tags-list-page',
	templateUrl: './tags.list.page.html',	
})
export class TagsListPage extends ListPage<Tag> implements OnInit {
    // inherited
    public homeUrl: string = "/catalogue/tags";
    
    constructor(
        protected admlangRepository: AdmLangRepository,
        protected tagRepository: TagRepository,
        private langRepository: LangRepository,
        protected appService: AppService,                
    ) {      
        super(admlangRepository, tagRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlFull;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.tagRepository.loadChunk();
            await this.langRepository.loadFull();
            this.appService.monitorLog("[tags] page loaded");    
            this.ready = true;            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
