import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { UsersListPage } from "./list/users.list.page";
import { UsersCreatePage } from "./create/users.create.page";
import { UsersEditPage } from "./edit/users.edit.page";
import { UserComponent } from "./user.component";

let routing = RouterModule.forChild ([        
	{path:"", component: UsersListPage, pathMatch: "full"},
	{path:"create", component: UsersCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: UsersEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		UsersListPage,
		UsersCreatePage,
		UsersEditPage,
		UserComponent,
	],    
})
export class UsersModule { }
