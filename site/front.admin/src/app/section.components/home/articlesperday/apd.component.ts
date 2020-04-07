import { Component, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';
import { IPoint } from '../../../model/point.interface';

@Component({
    selector: "articles-per-day",
    templateUrl: "./apd.component.html",
    styleUrls: ["./apd.component.scss"]
})
export class ApdComponent implements OnInit {        
    public ready: boolean = false;    
    public data: number[] = [3,1,4,1,1,2,3];
    public radius: number = 40;
    public PI: number = Math.PI;
    public radiuses: number[] = []; // radiuses of sectors in percents
    
    constructor(        
        private appService: AppService,
    ) {}

    get allAreNull(): boolean {return !this.radiuses.find(r => r);}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {
                // TODO: load data


                const maxApd: number = Math.max(...this.data);
                const preradiuses: number[] = this.data.map(x => Math.round(x * 100 / maxApd));
                this.radiuses = preradiuses.map(pr => Math.round(pr * this.radius / 100));                
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }            
        }, 1000);
    }   
    
    private polarToCartesian(centerX: number, centerY: number, radius: number, angleRad: number): IPoint {      
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
}
