import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './modules/home/home.page';
import { CatalogueModule } from './modules/catalogue/catalogue.module';
import { NotfoundPage } from './modules/notfound/notfound.page';
import { StaticModule } from './modules/static/static.module';

const routes: Routes = [
	{path:"", component: HomePage},
	{path:"404", component: NotfoundPage},
	{path:":lang", component: HomePage},	
	{path: ":lang/catalogue", loadChildren: () => CatalogueModule}, 
	{path:":lang/:page", loadChildren: () => StaticModule},
	{path:"**", redirectTo: "/404"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
