import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LangsListPage } from './list/langs.list.page';
import { LangsCreatePage } from './create/langs.create.page';
import { CCModule } from '../../common.components/cc.module';
import { LangComponent } from './lang.component';
import { LangsEditPage } from './edit/langs.edit.page';

let routing = RouterModule.forChild ([        
	{path:"", component: LangsListPage, pathMatch: "full"},
	{path:"create", component: LangsCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: LangsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		LangsListPage,
		LangsCreatePage,
		LangsEditPage,
		LangComponent,
	]    
})
export class LangsModule { }
