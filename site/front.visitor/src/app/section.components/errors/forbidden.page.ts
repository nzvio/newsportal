import { Component, Optional, Inject, OnInit } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { AppService } from '../../services/app.service';

@Component({
	selector: 'forbidden-page',
	templateUrl: './forbidden.page.html',	
})
export class ForbiddenPage implements OnInit {	
	constructor(
		private appService: AppService,
        @Optional() @Inject(RESPONSE) private response: any,
	) {}

	public ngOnInit(): void {
		this.appService.setTitle ("403");
		this.appService.isServer ? this.response.statusCode = 403 : null;
	}
}
