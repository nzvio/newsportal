import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UIModule } from '../../ui/ui.module';
import { UsergroupsPage } from "./usergroups.page";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let routing = RouterModule.forChild ([        
    {path:"", component: UsergroupsPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		UsergroupsPage,
	],
    providers: [],    
})
export class UsergroupsModule { }
