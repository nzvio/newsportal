import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './modules/home/home.page';
import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsergroupsModule } from './modules/usergroups/usergroups.module';
import { UsersModule } from './modules/users/users.module';
import { OptionsModule } from './modules/options/options.module';
import { LangsModule } from './modules/langs/list/langs.module';

const routes: Routes = [
	{path:"", component: HomePage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "options", loadChildren: () => OptionsModule}, 
	{path: "users/usergroups", loadChildren: () => UsergroupsModule, canActivate: [AuthGuard]}, 
	{path: "users/users", loadChildren: () => UsersModule, canActivate: [AuthGuard]}, 
	{path: "auth", loadChildren: () => AuthModule}, 	
	{path: "langs", loadChildren: () => LangsModule}, 
	{path:"**", component: HomePage},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),			
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
