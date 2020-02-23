import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UIModule } from './ui/ui.module';
import { ServicesModule } from './services/services.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		
		UIModule,
		ServicesModule,
		HomeModule,
		PagesModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
