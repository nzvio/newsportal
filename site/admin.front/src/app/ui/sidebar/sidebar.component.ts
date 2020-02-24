import { Component, Input, Output, EventEmitter } from '@angular/core';
import { URL } from '../../model/url';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { AdmLang } from 'src/app/model/admlang.model';

@Component({
	selector: 'the-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],	
})
export class SidebarComponent {
    @Input() currentUrl: URL = new URL();
	@Input() sub1Active: boolean = false;
	@Output() sub1ActiveChange: EventEmitter<boolean> = new EventEmitter<boolean> (); 
	@Input() sub2Active: boolean = false;
	@Output() sub2ActiveChange: EventEmitter<boolean> = new EventEmitter<boolean> (); 
	@Input() currentLang: AdmLang;
	@Input() active: boolean = false;		
	@Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean> (); 
	public email: string = "";
	public password: string = "";
	public errorEmail: boolean = false;
	public errorPassword: boolean = false;

	constructor(
		private authService: AuthService,
		private appService: AppService,
	) {}

	get authenticated(): boolean {return this.authService.authData !== null;}
	get user(): User {return this.authService.authData.user;}

	public close(): void {
		this.activeChange.emit(false);
	}

	public toggleSub(n: number): void {
		let value: boolean = !this[`sub${n}Active`];
		this[`sub${n}ActiveChange`].emit(value);
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
