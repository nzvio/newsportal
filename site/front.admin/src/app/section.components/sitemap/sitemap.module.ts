import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { SitemapPage } from './sitemap.page';

let routing = RouterModule.forChild ([        
	{path:"", component: SitemapPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		SitemapPage,
	],    
})
export class SitemapModule { }
