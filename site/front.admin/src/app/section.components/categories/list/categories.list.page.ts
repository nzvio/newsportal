import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { Category } from '../../../model/orm/category.model';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';

@Component({
	selector: 'categories-list-page',
	templateUrl: './categories.list.page.html',	
})
export class CategoriesListPage extends ListPage<Category> implements OnInit {    
    // inherited
    public homeUrl: string = "/catalogue/categories";
    // local
    public selectedLang: Lang | null = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected categoryRepository: CategoryRepository, 
        private langRepository: LangRepository,        
        protected appService: AppService,        
    ) {      
        super(admlangRepository, categoryRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlFull;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.categoryRepository.loadChunk(); 
            await this.langRepository.loadFull();    
            
            if (this.ll.length) {
                this.selectedLang = this.ll[0];
                this.appService.monitorLog("[categories] page loaded");            
                this.ready = true;
            } else {
                this.appService.monitorLog("no languages found", true);            
            }            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
