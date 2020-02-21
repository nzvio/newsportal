import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './modules/home/home.page';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
	{path:"", component: HomePage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "users/usergroups", loadChildren: "./modules/usergroups/usergroups.module#UsergroupsModule", canActivate: [AuthGuard]}, 
	{path: "auth", loadChildren: "./modules/auth/auth.module#AuthModule"}, 
	{path:"**", component: HomePage},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),			
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
