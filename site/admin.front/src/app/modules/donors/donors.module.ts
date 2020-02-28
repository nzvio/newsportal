import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../ui/ui.module';
import { DonorsListPage } from "./list/donors.list.page";
import { DonorsCreatePage } from "./create/donors.create.page";
import { DonorsEditPage } from "./edit/donors.edit.page";
import { DonorComponent } from "./donor.component";

let routing = RouterModule.forChild ([        
	{path:"", component: DonorsListPage, pathMatch: "full"},
	{path:"create", component: DonorsCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: DonorsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		DonorsListPage,
		DonorsCreatePage,
		DonorsEditPage,
		DonorComponent,
	],    
})
export class DonorsModule { }
