import { Component } from '@angular/core';
import { ModulePage } from '../_module.page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
	selector: 'login-page',
	templateUrl: './login.page.html',	
})
export class LoginPage extends ModulePage {
	constructor(protected admlangRepository: AdmLangRepository) {
		super(admlangRepository);
	}
}
