import { Component } from '@angular/core';
import { Page } from '../_page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],	
})
export class HomePage extends Page {	
    constructor(protected admlangRepository: AdmLangRepository) {
        super(admlangRepository);
    }
    	
	public tinyInit (/*lang: Lang*/): Object {
        let self = this;
        return {
            branding:false, 
            //directionality: lang.rtl ? 'rtl' : 'ltr', 
            height:300, 
            width:"100%", 
            menubar:false, 
            plugins: ['image', 'code', 'table'], 
            toolbar: 'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code table image', 
            relative_urls: false,
            file_picker_callback: function () {
				//self.tinyUpload (this);
			}
        };
    }    
}
