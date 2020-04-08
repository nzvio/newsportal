import { Component, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';
import { IPoint } from '../../../model/point.interface';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { AdmLang } from '../../../model/admlang.model';
import { ApdRepository } from './apd.repository';

@Component({
    selector: "articles-per-day",
    templateUrl: "./apd.component.html",
    styleUrls: ["./apd.component.scss"]
})
export class ApdComponent implements OnInit {            
    public ready: boolean = false;    
    //public data: number[] = [300,100,400,100,100,200,300];
    public data: number[] = [];
    public radius: number = 40;
    public PI: number = Math.PI;
    public radiuses: number[] = []; // radiuses of sectors in percents
    public days: Date[] = [];
    public selectedDate: Date | null = null;
    public selectedDateActive: boolean = false;
    public selectedData: number | null = null;
    public selectedDataActive: boolean = false;
    
    constructor(        
        private appService: AppService,
        private admlangRepository: AdmLangRepository,
        private apdRepository: ApdRepository,
    ) {}

    get allAreNull(): boolean {return !this.radiuses.find(r => r);}    
    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {                
                await this.apdRepository.load();
                this.data = this.apdRepository.xlFull;
                this.initDays();
                const maxApd: number = Math.max(...this.data);
                const preradiuses: number[] = this.data.map(x => Math.round(x * 100 / maxApd));
                this.radiuses = preradiuses.map(pr => Math.round(pr * this.radius / 100));                
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }            
        }, 1000);
    }  
    
    private initDays(): void {
        const currentDate: Date = new Date();

        for (let i: number = 0; i < 12; i++) {
            const date: Date = new Date(currentDate.getTime() - i * 1000 * 60 * 60 * 24);            
            this.days.push(date);
        }
    }
    
    public polarToCartesian(centerX: number, centerY: number, radius: number, angleRad: number): IPoint {      
        return {
            x: centerX + (radius * Math.cos(angleRad)),
            y: centerY + (radius * Math.sin(angleRad))
        };
    }

    public sector(x, y, radius, startAngle, endAngle): string {
        const start: IPoint = this.polarToCartesian(x, y, radius, endAngle);
        const end: IPoint = this.polarToCartesian(x, y, radius, startAngle);    
        const arcSweep: string = endAngle - startAngle <= Math.PI ? "0" : "1";    
        const d: string = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x,y,
            "L", start.x, start.y
        ].join(" ");        
    
        return d;       
    } 
    
    public selectedDateFormat(): string {
        return this.selectedDate !== null ? `${this.currentLang.phrases['workspace-home-date']}: ${this.selectedDate.getUTCDate()}/${this.appService.twoDigits(this.selectedDate.getUTCMonth()+1)}/${this.selectedDate.getUTCFullYear()}` : "";
    }

    public selectedDataFormat(): string {
        return this.selectedData !== null ? `${this.currentLang.phrases['workspace-home-articles']}: ${this.selectedData}` : "";
    }
}
