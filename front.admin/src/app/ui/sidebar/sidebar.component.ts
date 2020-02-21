import { Component, Input, Output, EventEmitter } from '@angular/core';
import { URL } from '../../model/url.class';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'the-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],	
})
export class SidebarComponent {
    @Input() currentUrl: URL = new URL();
	@Input() sub1Active: boolean = false;
	@Input() sub2Active: boolean = false;
	@Input() active: boolean = false;	
	@Output() activeChanged: EventEmitter<boolean> = new EventEmitter<boolean> ();    

	constructor(private authService: AuthService) {}

	get user(): User {return this.authService.user;}

	public close(): void {
		this.activeChanged.emit(false);
	}
}
