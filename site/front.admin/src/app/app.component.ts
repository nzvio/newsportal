import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from "rxjs/operators";

import { URL } from './model/url';
import { AuthService } from './services/auth.service';
import { AdmLangRepository } from './services/repositories/admlang.repository';
import { AdmLang } from './model/admlang.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	public time: string = "";	
	public sub1Active: boolean = false;	
	public sub2Active: boolean = false;	
	public sub3Active: boolean = false;	
	
	constructor(
		private appService: AppService,
		private authService: AuthService,
		private admlangRepository: AdmLangRepository,
		private router: Router,
	) {	}

	get monitorContent(): string {return this.appService.monitorContent;}
	get mmActive(): boolean {return this.appService.mmActive;}
	set mmActive(v: boolean) {this.appService.mmActive = v;}
	get authenticated(): boolean {return this.authService.authData !== null;}
	get langsReady(): boolean {return this.admlangRepository.currentLang != null;}
	get currentLang(): AdmLang {return this.admlangRepository.currentLang;}
	get currentUrl(): URL {return this.appService.currentUrl;}

	public ngOnInit(): void {
		this.admlangRepository.load();
		this.initRoutingRoutine();		
		this.appService.monitorLog("VNE panel loaded");		
	}

	private initRoutingRoutine(): void {
		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationStart))
			.subscribe(event => {
				this.currentUrl.build(event.url);				
				setTimeout(() => {
					window.scrollTo(0, 0);
				}, 1);
			});
	}	
}
