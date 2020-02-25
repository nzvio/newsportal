import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesListPage } from './list/pages.list.page';
import { UIModule } from 'src/app/ui/ui.module';

let routing = RouterModule.forChild ([        
	{path:"", component: PagesListPage, pathMatch: "full"},
	//{path:"create", component: PagesCreatePage, pathMatch: "full"},
	//{path:"edit/:_id", component: PagesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		PagesListPage,
		//PagesCreatePage,
		//PagesEditPage,
		//PageComponent,
	]    
})
export class PagesModule { }
