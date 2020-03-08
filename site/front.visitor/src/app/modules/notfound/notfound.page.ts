import { Component, Optional, Inject, OnInit } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'notfound-page',
	templateUrl: './notfound.page.html',
	styleUrls: ['./notfound.page.scss']
})
export class NotfoundPage implements OnInit {	
	constructor(
		private appService: AppService,
        @Optional() @Inject(RESPONSE) private response: any,
	) {}

	public ngOnInit(): void {
		this.appService.setTitle ("404");
		this.appService.isServer ? this.response.statusCode = 404 : null;
	}
}
