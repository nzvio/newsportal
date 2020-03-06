import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomePage } from './home/home.page';
import { Page404 } from './pages/404/404.page';
import { StaticPage } from './pages/static/static.page';
import { CatalogueModule } from './catalogue/catalogue.module';

const routes: Routes = [
	{path:"", component: HomePage},
	{path:":lang", component: HomePage},
	{path: ":lang/cat", loadChildren: () => CatalogueModule}, 
	{path:":lang/:page", component: StaticPage},
	{path:"**", component: Page404},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
