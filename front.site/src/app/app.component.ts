import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { NavHistory } from './model/navhistory.class';
import { INavScroll } from './model/navscroll.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {		
	public stickyVisible: boolean = false;
	public indicatorWidth: number = 0;
	@ViewChild("wrap", {static: false}) wrapElement: ElementRef;
	private navHistory: NavHistory = new NavHistory();

	constructor(
		private appService: AppService,
		private router: Router,		
	) {			
	}

	get wrapper(): HTMLElement {return this.appService.wrapper;}
	set wrapper(v: HTMLElement) {this.appService.wrapper = v;}

	public ngOnInit(): void {		
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.wrapper = this.wrapElement.nativeElement as HTMLElement;						
			this.initNavScrolling();		
		}, 1);
	}

	private initNavScrolling(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {					
				this.navHistory.processUrl({url: this.router.url, scroll: this.wrapper.scrollTop});					

				if (event.restoredState) { // back or forward browser button pressed
					let state: INavScroll = this.navHistory.states.find(s => s.url === event.url) || null;
					this.navHistory.needScrollTo = state ? state.scroll : 0;												
				} else { // link opened
					this.navHistory.needScrollTo = 0;
				}					
			} else if (event instanceof NavigationEnd) {					
				this.wrapper.scrollTo(0, this.navHistory.needScrollTo);
			}
		});
	}
	
	public onScroll(event: any): void {		
		this.stickyVisible = this.wrapper.scrollTop >= 170;	
		this.indicatorWidth = Math.round(100 * this.wrapper.scrollTop / (this.wrapper.scrollHeight - this.wrapper.clientHeight));
	}		
}
