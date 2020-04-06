import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";

import { ApmRepository } from './apm.repository';
import { AppService } from '../../../services/app.service';

@Component({
    selector: "articles-per-month",
    templateUrl: "./apm.component.html",
    styleUrls: ["./apm.component.scss"]
})
export class ApmComponent implements AfterViewInit {    
    @ViewChild("apm") elementRef: ElementRef;
    private element: HTMLElement | null = null;
    public ready: boolean = false;
    private height: number = 0;
    public columns: number[] = []; // heights in percents
    public months: number[] = [];

    constructor(
        private apmRepository: ApmRepository,
        private appService: AppService,
    ) {}

    public ngAfterViewInit(): void {
        setTimeout(async () => {
            try {
                this.element = this.elementRef.nativeElement;
                this.height = this.element.offsetHeight - 30;
                await this.apmRepository.load();
                const data: number[] = this.apmRepository.xlFull;
                const maxApm: number = Math.max(...data);
                this.columns = data.map(x => Math.round(x * 100 / maxApm));
                this.initMonths();
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }
            
        }, 1);
    }

    private initMonths(): void {
        let currentMonth: number = new Date().getUTCMonth() + 1;
        let month: number = currentMonth === 12 ? 1 : currentMonth + 1;

        for (let i: number = 0; i < 12; i++) {
            month === 13 ? month = 1 : null;
            this.months.push(month);
            month++;
        }
    }

    // percent to px
    public columnHeight(h: number): string {
        return `${Math.round(h * this.height / 100)}px`;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        this.element ? this.height = this.element.offsetHeight - 30 : null;
    }
}
