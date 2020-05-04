import { Component, OnInit } from '@angular/core';

import { SettingRepository } from '../../../services/repositories/setting.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Setting } from '../../../model/orm/setting.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'settings-list-page',
	templateUrl: './settings.list.page.html',	
})
export class SettingsListPage extends ListPage<Setting> implements OnInit {
    // inherited
    public homeUrl: string = "/service/settings";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected settingRepository: SettingRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, settingRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.settingRepository.loadChunk();
            this.appService.monitorLog("[settings] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
