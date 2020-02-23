import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './error.service';
import { UsergroupRepository } from './repositories/usergroup.repository';
import { UserRepository } from './repositories/user.repository';

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
		UserRepository,
	],
})
export class ServicesModule { }
