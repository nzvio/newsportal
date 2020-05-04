import { Component, OnInit } from '@angular/core';

import { SectionPage } from '../_section.page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';
import { AppService } from '../../services/app.service';
import { SitemapRepository } from '../../services/repositories/sitemap.repository';

@Component({
	selector: 'sitemap-page',
    templateUrl: './sitemap.page.html',	
    styleUrls: ["./sitemap.page.scss"],
})
export class SitemapPage extends SectionPage implements OnInit {    
    public ready: boolean = false;
    public reloading: boolean = false;

    constructor(
        protected admlangRepository: AdmLangRepository,   
        protected sitemapRepository: SitemapRepository,     
        protected appService: AppService,        
    ) {
        super(admlangRepository);
    } 
    
    get data(): string {return this.sitemapRepository.data;}
    set data(v: string) {this.sitemapRepository.data = v;}
    
    public async ngOnInit(): Promise<void> {
        try {            
            await this.sitemapRepository.load();
            this.appService.monitorLog("[sitemap] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }  
    
    public async save(): Promise<void> {
        try {
            this.reloading = true;
            this.appService.monitorLog("saving sitemap...");
            await this.sitemapRepository.save();
            this.appService.monitorLog("ok");
            this.reloading = false;
        } catch (err) {
            this.appService.monitorLog(err, true);
            this.reloading = false;
        }
    }

    public async build(): Promise<void> {
        try {
            this.reloading = true;
            this.appService.monitorLog("building sitemap...");
            await this.sitemapRepository.build();
            this.appService.monitorLog("ok");
            this.reloading = false;
        } catch (err) {
            this.appService.monitorLog(err, true);
            this.reloading = false;
        }
    }
}
