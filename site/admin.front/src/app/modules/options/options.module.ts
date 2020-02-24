import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptionsPage } from './options.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

let routing = RouterModule.forChild ([        
	{path:"", component: OptionsPage, pathMatch: "full"},	
]);

@NgModule({	
    imports: [	
		routing,
		FormsModule,
		CommonModule,
	],
	declarations: [
		OptionsPage,
	],
    providers: [],    
})
export class OptionsModule { }
