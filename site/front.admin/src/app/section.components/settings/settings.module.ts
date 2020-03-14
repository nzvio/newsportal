import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { SettingsListPage } from "./list/settings.list.page";
import { SettingsCreatePage } from "./create/settings.create.page";
import { SettingComponent } from "./setting.component";

let routing = RouterModule.forChild ([        
	{path:"", component: SettingsListPage, pathMatch: "full"},
	{path:"create", component: SettingsCreatePage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		SettingsListPage,
		SettingsCreatePage,		
		SettingComponent,
	],    
})
export class SettingsModule { }
