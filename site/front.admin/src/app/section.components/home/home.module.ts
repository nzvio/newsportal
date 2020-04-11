import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePage } from './home.page';
import { CCModule } from '../../common.components/cc.module';
import { ApmComponent } from './articlespermonth/apm.component';
import { ApmRepository } from './articlespermonth/apm.repository';
import { ApdComponent } from './articlesperday/apd.component';
import { ApdRepository } from './articlesperday/apd.repository';
import { ApcComponent } from './articlespercategory/apc.component';
import { ApcRepository } from './articlespercategory/apc.repository';
import { SummaryRepository } from './summary/summary.repository';
import { SummaryComponent } from './summary/summary.component';

@NgModule({	
    imports: [	
		CommonModule,
		CCModule,
	],
	declarations: [
		HomePage,
		ApmComponent,
		ApdComponent,
		ApcComponent,
		SummaryComponent,
	],
    providers: [
		ApmRepository,
		ApdRepository,
		ApcRepository,
		SummaryRepository,
	],    
})
export class HomeModule { }
