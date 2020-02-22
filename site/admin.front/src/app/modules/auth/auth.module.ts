import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { LogoutPage } from './logout.page';

let routing = RouterModule.forChild ([        
	{path:"login", component: LoginPage, pathMatch: "full"},
	{path:"logout", component: LogoutPage, pathMatch: "full"},
	{path:"**", redirectTo: "/auth/logout"},
]);

@NgModule({	
    imports: [
		routing,
	],
	declarations: [
		LoginPage,
		LogoutPage,
	],
    providers: [],    
})
export class AuthModule { }
