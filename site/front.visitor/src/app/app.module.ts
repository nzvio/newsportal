import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { UIModule } from './ui/ui.module';
import { ServicesModule } from './services/services.module';
import { NotfoundModule } from './modules/notfound/notfound.module';
import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from './cache/cache.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		HttpClientModule,
		
		CacheModule,
		UIModule,
		ServicesModule,
		HomeModule,
		NotfoundModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
