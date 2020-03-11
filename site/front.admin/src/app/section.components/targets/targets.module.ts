import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { TargetsListPage } from "./list/targets.list.page";
import { TargetsCreatePage } from "./create/targets.create.page";
import { TargetsEditPage } from "./edit/targets.edit.page";
import { TargetComponent } from "./target.component";

let routing = RouterModule.forChild ([        
	{path:"", component: TargetsListPage, pathMatch: "full"},
	{path:"create", component: TargetsCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: TargetsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		TargetsListPage,
		TargetsCreatePage,
		TargetsEditPage,
		TargetComponent,
	],    
})
export class TargetsModule { }
