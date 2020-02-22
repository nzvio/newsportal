import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../ui/ui.module';
import { UsergroupsListPage } from "./list/usergroups.list.page";
import { UsergroupsCreatePage } from "./create/usergroups.create.page";
import { UsergroupsEditPage } from "./edit/usergroups.edit.page";
import { UsergroupComponent } from "./usergroup.component";

let routing = RouterModule.forChild ([        
	{path:"", component: UsergroupsListPage, pathMatch: "full"},
	{path:"create", component: UsergroupsCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: UsergroupsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		UsergroupsListPage,
		UsergroupsCreatePage,
		UsergroupsEditPage,
		UsergroupComponent,
	],
    providers: [],    
})
export class UsergroupsModule { }
