import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from "rxjs/operators";
import { URL } from './model/url.class';
import { AuthService } from './services/auth.service';
import { User } from './model/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	public time: string = "";
	public currentUrl: URL = new URL();
	public sub1Active: boolean = false;	
	public sub2Active: boolean = false;	

	constructor(
		private appService: AppService,
		private authService: AuthService,
		private router: Router,
	) {	}

	get monitorContent(): string {return this.appService.monitorContent;}
	get mmActive(): boolean {return this.appService.mmActive;}
	set mmActive(v: boolean) {this.appService.mmActive = v;}
	get authenticated(): boolean {return this.authService.authData !== null;}

	public ngOnInit(): void {
		this.initRoutingRoutine();		
		this.appService.monitorLog("VNE panel initiated");
	}

	private initRoutingRoutine(): void {
		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationStart))
			.subscribe(event => {
				this.currentUrl.build(event.url);				
				setTimeout(() => {
					this.sub1Active = this.currentUrl.parts[0] === "catalogue";
					this.sub2Active = this.currentUrl.parts[0] === "users";
					window.scrollTo(0, 0);
				}, 1);
			});
	}	
}
