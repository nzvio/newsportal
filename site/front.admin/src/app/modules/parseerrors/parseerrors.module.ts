import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../ui/ui.module';
import { ParseerrorsListPage } from "./list/parseerrors.list.page";

let routing = RouterModule.forChild ([        
	{path:"", component: ParseerrorsListPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		UIModule,
		routing,
	],
	declarations: [
		ParseerrorsListPage,
	],    
})
export class ParseerrorsModule { }
