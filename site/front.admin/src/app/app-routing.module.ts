import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './section.components/home/home.page';
import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './section.components/auth/auth.module';
import { UsergroupsModule } from './section.components/usergroups/usergroups.module';
import { UsersModule } from './section.components/users/users.module';
import { OptionsModule } from './section.components/options/options.module';
import { LangsModule } from './section.components/langs/langs.module';
import { PagesModule } from './section.components/pages/pages.module';
import { CategoriesModule } from './section.components/categories/categories.module';
import { ArticlesModule } from './section.components/articles/articles.module';
import { DonorsModule } from './section.components/donors/donors.module';
import { TargetsModule } from './section.components/targets/targets.module';
import { ParseerrorsModule } from './section.components/parseerrors/parseerrors.module';
import { TagsModule } from './section.components/tags/tags.module';

const routes: Routes = [
	{path:"", component: HomePage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "options", loadChildren: () => OptionsModule}, 
	{path: "users/usergroups", loadChildren: () => UsergroupsModule, canActivate: [AuthGuard]}, 
	{path: "users/users", loadChildren: () => UsersModule, canActivate: [AuthGuard]}, 
	{path: "auth", loadChildren: () => AuthModule}, 	
	{path: "langs", loadChildren: () => LangsModule}, 
	{path: "pages", loadChildren: () => PagesModule}, 
	{path: "catalogue/categories", loadChildren: () => CategoriesModule}, 
	{path: "catalogue/articles", loadChildren: () => ArticlesModule}, 
	{path: "catalogue/tags", loadChildren: () => TagsModule}, 
	{path: "parsing/donors", loadChildren: () => DonorsModule}, 
	{path: "parsing/targets", loadChildren: () => TargetsModule}, 
	{path: "parsing/parseerrors", loadChildren: () => ParseerrorsModule}, 
	{path:"**", component: HomePage},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),			
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
