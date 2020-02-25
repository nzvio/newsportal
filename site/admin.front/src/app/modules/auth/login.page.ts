import { Component } from '@angular/core';
import { ThePage } from '../_page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
	selector: 'login-page',
	templateUrl: './login.page.html',	
})
export class LoginPage extends ThePage {
	constructor(protected admlangRepository: AdmLangRepository) {
		super(admlangRepository);
	}
}
