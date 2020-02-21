import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector:"the-header", 
    templateUrl: "./header.component.html",     
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {    
    @Input() stickyVisible: boolean = false;
    @Input() indicatorWidth: number = 0;
    @ViewChild("sticky", {static: false}) sticky: ElementRef;  
    @ViewChild("scrollindicator", {static: false}) scrollindicator: ElementRef;  
    public mmActive: boolean = false;

    constructor(
        private appService: AppService,
        @Inject(PLATFORM_ID) private platformId: Object,  
    ) {        
    }
    
    get wrapper(): HTMLElement {return this.appService.wrapper;}

    public async ngAfterViewInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            await this.waitForLayout();
            this.adjustLayout();
        }        
    }
    
    private adjustLayout(): void {
		let e: HTMLDivElement = document.createElement("div");
		e.style.width = "100%";
		e.style.height = "1px";		
		this.wrapper.appendChild(e);
		let w1: number = e.offsetWidth;
		e.style.position = "fixed";
		let w2: number = e.clientWidth;
		let scrollWidth: number = w2 - w1;
		e.remove ();
        this.sticky.nativeElement.style.width = `calc(100% - ${scrollWidth}px)`;
        this.scrollindicator.nativeElement.style.width = `calc(100% - ${scrollWidth}px)`;
    }
    
    private waitForLayout(): Promise<void> {
        return new Promise((resolve, reject) => {
            let check = () => {
                if (this.wrapper !== undefined) {
                    resolve();
                } else {
                    setTimeout(check, 10);
                }                
            };

            check();
        });
    }
}
