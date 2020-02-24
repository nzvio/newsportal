import { Component } from '@angular/core';
import { Page } from '../_page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
	selector: 'login-page',
	templateUrl: './login.page.html',	
})
export class LoginPage extends Page {
	constructor(protected admlangRepository: AdmLangRepository) {
		super(admlangRepository);
	}
}
