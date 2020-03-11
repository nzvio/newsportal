import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';

import { URL } from '../../model/url';
import { AppService } from '../../services/app.service';
import { AdmLang } from '../../model/admlang.model';

@Component({
	selector: 'the-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],	
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() currentUrl: URL = new URL();
    @Input() sub1Active: boolean = false;
    @Input() sub2Active: boolean = false;
    @Input() monitorContent: string = "";
    @Input() authenticated: boolean = false;
    @Input() currentLang: AdmLang;
    public time: string = "";
    @ViewChild("monitor", {static: false}) monitorRef: ElementRef;
    private monitor: HTMLElement | null = null;
    public opaque: boolean = false;

    constructor(
        private appService: AppService,
    ) { }

    public ngOnInit(): void {
        setInterval(() => {
			let date: Date = new Date();
			this.time = `${this.appService.twoDigits(date.getHours())}:${this.appService.twoDigits(date.getMinutes())}:${this.appService.twoDigits(date.getSeconds())}`;
		}, 1000);
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.monitor = this.monitorRef.nativeElement;
        }, 1);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.monitorContent && this.monitor) {
            setTimeout(() => {                
                this.appService.smoothScroll(this.monitor.scrollTop, this.monitor.scrollHeight, 300, this.monitor);
            }, 1);           
        }
    }

    public activateMobMenu(): void {
        this.appService.mmActive = true;
    }

    @HostListener('window:scroll', ['$event']) 
	public onScroll(event: any): void {
		this.opaque = window.scrollY > 50;
	}
}
