import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { UIModule } from './ui/ui.module';
import { HomeModule } from "./modules/home/home.module";
import { UsergroupsModule } from './modules/usergroups/usergroups.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,	
		HttpClientModule,	

		AppRoutingModule,				
		ServicesModule,
		UIModule,	
		HomeModule,	
		UsergroupsModule,
		AuthModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
