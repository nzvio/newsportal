import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { UsergroupRepository } from './repositories/usergroup.repository';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './error.service';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
		AppService,
		ErrorService,
    	DataService,
		AuthService,
		AuthGuard,
		UsergroupRepository,
	],
})
export class ServicesModule { }
