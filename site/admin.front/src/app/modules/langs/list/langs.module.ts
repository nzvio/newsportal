import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LangsListPage } from './langs.list.page';
import { UIModule } from 'src/app/ui/ui.module';

let routing = RouterModule.forChild ([        
	{path:"", component: LangsListPage, pathMatch: "full"},
	//{path:"create", component: LangsCreatePage, pathMatch: "full"},
	//{path:"edit/:_id", component: LangsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		LangsListPage,
		//LangsCreatePage,
		//LangsEditPage,
		//LangComponent,
	]    
})
export class LangsModule { }
