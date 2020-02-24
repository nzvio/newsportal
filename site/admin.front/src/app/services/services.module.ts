import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './error.service';
import { UsergroupRepository } from './repositories/usergroup.repository';
import { UserRepository } from './repositories/user.repository';
import { UploadService } from './upload.service';
import { AdmLangRepository } from './repositories/admlang.repository';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
		AppService,
		ErrorService,
		DataService,
		AdmLangRepository,
		AuthService,
		AuthGuard,
		UploadService,
		UsergroupRepository,
		UserRepository,
	],
})
export class ServicesModule { }
