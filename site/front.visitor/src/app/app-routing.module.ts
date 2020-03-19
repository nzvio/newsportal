import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './section.components/home/home.page';
import { CatalogueModule } from './section.components/catalogue/catalogue.module';
import { NotfoundPage } from './section.components/errors/notfound.page';
import { StaticModule } from './section.components/static/static.module';
import { UserModule } from './section.components/user/user.module';
import { ForbiddenPage } from './section.components/errors/forbidden.page';

const routes: Routes = [
	{path:"", component: HomePage},
	{path:"404", component: NotfoundPage, pathMatch: "full"},
	{path:"403", component: ForbiddenPage, pathMatch: "full"},
	{path:":lang", component: HomePage},	
	{path: ":lang/catalogue", loadChildren: () => CatalogueModule}, 
	{path: ":lang/user", loadChildren: () => UserModule}, 
	{path:":lang/:page", loadChildren: () => StaticModule},	
	{path:"**", redirectTo: "/404"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
