import { Component, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';
import { IApcDTO } from './apc.dto';
import { ApcRepository } from './apc.repository';

@Component({
    selector: "articles-per-category",
    templateUrl: "./apc.component.html",
    styleUrls: ["./apc.component.scss"]
})
export class ApcComponent implements OnInit {
    public ready: boolean = false;
    public data: IApcDTO[] = [];
    public widths: number[] = [];

    constructor(
        private appService: AppService,
        private apcRepository: ApcRepository,
    ) {}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {                
                await this.apcRepository.load();
                this.data = this.apcRepository.xlFull;
                const maxApcQ: number = Math.max(...this.data.map(d => d.q));
                this.widths = this.data.map(x => Math.round(x.q * 100 / maxApcQ));                
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }            
        }, 1500);
    }
}
