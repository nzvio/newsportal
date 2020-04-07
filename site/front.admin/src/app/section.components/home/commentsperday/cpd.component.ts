import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';
import { IPoint } from '../../../model/point.interface';

@Component({
    selector: "comments-per-day",
    templateUrl: "./cpd.component.html",
    styleUrls: ["./cpd.component.scss"]
})
export class CpdComponent implements OnInit {        
    public ready: boolean = false;    
    public data: number[] = [456, 89, 647, 950, 10, 95, 367];
    //public circumference: number = 2 * Math.PI * 40;
    //public sectorLength: number = this.circumference - (2 * Math.PI / 7) * 40;
    public PI: number = Math.PI;
    
    constructor(        
        private appService: AppService,
    ) {}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {
                // TODO: load data



                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }            
        }, 1500);
    }   
    
    private polarToCartesian(centerX: number, centerY: number, radius: number, angleRad: number): IPoint {      
        return {
            x: centerX + (radius * Math.cos(angleRad)),
            y: centerY + (radius * Math.sin(angleRad))
        };
    }

    public arc(x, y, radius, startAngle, endAngle): string {
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
