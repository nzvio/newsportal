import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

let routing = RouterModule.forChild ([        
    {path:"", component: AuthPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [
		routing,
	],
	declarations: [
		AuthPage,
	],
    providers: [],    
})
export class AuthModule { }
