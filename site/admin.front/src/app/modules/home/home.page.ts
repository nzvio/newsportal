import { Component, OnInit } from '@angular/core';
import { Page } from '../_page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],	
})
export class HomePage extends Page implements OnInit {	
    public ready: boolean = false;

    constructor(
        protected admlangRepository: AdmLangRepository,
        private appService: AppService,
    ) {
        super(admlangRepository);
    }

    public ngOnInit(): void {
        this.appService.monitorLog("home page loaded");
        this.ready = true;
    }
    	
	/*public tinyInit (ang: Lang): Object {
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
    } */   
}
