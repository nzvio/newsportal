import { Component } from '@angular/core';
import { SectionPage } from '../_section.page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
	selector: 'login-page',
	templateUrl: './login.page.html',	
})
export class LoginPage extends SectionPage {
	constructor(protected admlangRepository: AdmLangRepository) {
		super(admlangRepository);
	}
}
