import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { ParseerrorsListPage } from "./list/parseerrors.list.page";

let routing = RouterModule.forChild ([        
	{path:"", component: ParseerrorsListPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		ParseerrorsListPage,
	],    
})
export class ParseerrorsModule { }
