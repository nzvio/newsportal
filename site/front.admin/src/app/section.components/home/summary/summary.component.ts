import { Component, OnInit } from "@angular/core";

import { SummaryRepository } from './summary.repository';
import { AppService } from '../../../services/app.service';
import { ISummary } from './summary.dto';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { AdmLang } from '../../../model/admlang.model';

@Component({
    selector: "the-summary",
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit {
    public summary: ISummary | null = null;
    public ready: boolean = false;

    constructor(
        private summaryRepository: SummaryRepository,
        private admlangRepository: AdmLangRepository,
        private appService: AppService,        
    ) {}

    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {
                this.summary = await this.summaryRepository.load();
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }
        }, 2000);        
    }
}