import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from "rxjs/operators";

import { URL } from '../../model/url';
import { User } from '../../model/orm/user.model';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { AdmLang } from 'src/app/model/admlang.model';

@Component({
	selector: 'the-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],	
})
export class SidebarComponent implements AfterViewInit {
    @Input() currentUrl: URL = new URL();
	@Input() currentLang: AdmLang;
	@Input() active: boolean = false;		
	@Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean> (); 
	public email: string = "";
	public password: string = "";
	public errorEmail: boolean = false;
	public errorPassword: boolean = false;	
	public subActive: boolean[] = [false, false, false, false];

	constructor(
		private authService: AuthService,
		private appService: AppService,
		private router: Router,
	) {}

	get authenticated(): boolean {return this.authService.authData !== null;}
	get user(): User {return this.authService.authData.user;}
	
	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.buildSub();
			this.router.events
				.pipe(filter((event: RouterEvent) => event instanceof NavigationStart))
				.subscribe(event => {								
					this.buildSub();
			});
		}, 1);		
	}

	private buildSub(): void {
		this.subActive[0] = this.appService.currentUrl.parts[0] === "catalogue";
		this.subActive[1] = this.appService.currentUrl.parts[0] === "users";
		this.subActive[2] = this.appService.currentUrl.parts[0] === "parsing";
		this.subActive[3] = this.appService.currentUrl.parts[0] === "service";				
	}

	public close(): void {
		this.activeChange.emit(false);
	}

	public toggleSub(i: number): void {		
		this.subActive[i] = !this.subActive[i];
	}

	public login(): void {
		if (this.validateLogin()) {
			this.appService.monitorLog("authenticating...");
			this.authService.login(this.email, this.password);
		}
	}

	private validateLogin(): boolean {
		this.appService.monitorLog("checking login form...");
		this.email = this.email.trim();		
		let error = false;

		if (!this.email.length) {
			this.errorEmail = true;
			error = true;
			this.appService.monitorLog("e-mail empty", true);
		} else if (!this.appService.validateEmail(this.email)) {
			this.errorEmail = true;
			error = true;
			this.appService.monitorLog("e-mail incorrect", true);
		} else {
			this.errorEmail = false;
		}		

		if (!this.password.length) {
			this.errorPassword = true;
			error = true;
			this.appService.monitorLog("password empty", true);
		} else {
			this.errorPassword = false;
		}

		return !error;
	}
}
