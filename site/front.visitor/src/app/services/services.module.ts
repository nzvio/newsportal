import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { ErrorService } from './error.service';
import { DataService } from './data.service';
import { LangRepository } from './repositories/lang.repository';
import { PageRepository } from './repositories/page.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ArticleTopRepository } from './repositories/article.top.repository';
import { ArticleMainRepository } from './repositories/article.main.repository';

@NgModule({
    imports: [                
        
    ],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        ErrorService,
        DataService,
        LangRepository,
        PageRepository,
        CategoryRepository,
        ArticleTopRepository,
        ArticleMainRepository,
    ],
})
export class ServicesModule {    
}
