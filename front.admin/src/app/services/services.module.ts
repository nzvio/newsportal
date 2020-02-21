import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { UsergroupRepository } from './repositories/usergroup.repository';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
		AppService,
    	DataService,
		AuthService,
		AuthGuard,
		UsergroupRepository,
	],
})
export class ServicesModule { }
