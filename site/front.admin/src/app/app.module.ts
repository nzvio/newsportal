import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { HomeModule } from "./section.components/home/home.module";
import { HttpClientModule } from '@angular/common/http';
import { CCModule } from './common.components/cc.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,	
		CommonModule,
		HttpClientModule,	

		AppRoutingModule,				
		ServicesModule,
		CCModule,
		HomeModule,			
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
