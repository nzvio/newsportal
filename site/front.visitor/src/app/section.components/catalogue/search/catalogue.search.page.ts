import { Component, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';

@Component({
    selector: "catalogue-search-page",
    templateUrl: "./catalogue.search.page.html",    
})
export class CatalogueSearchPage implements OnInit {
    constructor(
        private appService: AppService,
        private langRepository: LangRepository,        
    ) {}

    public ngOnInit(): void {        
        this.appService.setTitle(this.currentLang.s("search"));
    }

    get currentLang(): Lang {return this.langRepository.current.value;}
    get searchKeyword(): string {return this.appService.searchKeyword.value;}
}
