import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './section.components/home/home.module';
import { ServicesModule } from './services/services.module';
import { ErrorsModule } from './section.components/errors/errors.module';
import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from './cache/cache.module';
import { CCModule } from './common.components/cc.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		HttpClientModule,
		
		CacheModule,
		CCModule,
		ServicesModule,
		HomeModule,
		ErrorsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
