import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { ErrorService } from './error.service';
import { DataService } from './data.service';
import { LangRepository } from './repositories/lang.repository';
import { PageRepository } from './repositories/page.repository';

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
    ],
})
export class ServicesModule {    
}
