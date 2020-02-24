import { Component, OnInit } from '@angular/core';
import { Page } from '../_page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';
import { AdmLang } from 'src/app/model/admlang.model';

@Component({
	selector: 'options-page',
	templateUrl: './options.page.html',	
})
export class OptionsPage extends Page implements OnInit {	
    public ready: boolean = false;
    public selectedLang: string = "";

    constructor(protected admlangRepository: AdmLangRepository) {
        super(admlangRepository);
    }	  
    
    get admlangs(): AdmLang[] {return this.admlangRepository.langs;}

    public ngOnInit(): void {
        this.selectedLang = this.currentLang.name;
        this.ready = true;
    }

    public setCurrentLang(): void {
        this.admlangRepository.setCurrentLang(this.selectedLang);
    }
}
