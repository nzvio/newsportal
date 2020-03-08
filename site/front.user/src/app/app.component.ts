import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NavHistory } from './model/navhistory';
import { INavScroll } from './model/navscroll.interface';
import { LangRepository } from './services/repositories/lang.repository';
import { Lang } from './model/lang.model';
import { PageRepository } from './services/repositories/page.repository';

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
		private langRepository: LangRepository,
		private pageRepository: PageRepository,
	) {			
	}

	get wrapper(): HTMLElement {return this.appService.wrapper;}
	set wrapper(v: HTMLElement) {this.appService.wrapper = v;}	
	get isBrowser(): boolean {return this.appService.isBrowser;}
	get langsReady(): boolean {return this.langRepository.current != null;}	
	get pagesReady(): boolean {return this.pageRepository.xl != null;}

	public ngOnInit(): void {	
		this.initLangs();	
		this.pageRepository.load();
	}

	public ngAfterViewInit(): void {
		if (this.isBrowser) {
			setTimeout(() => {
				this.wrapper = this.wrapElement.nativeElement as HTMLElement;						
				this.initNavScrolling();		
			}, 1);
		}		
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

	private initLangs(): void {		
		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
			.subscribe(async (event: NavigationEnd) => {					
				await this.langRepository.load();

				if (this.langRepository.xl.length) {
					let langName: string = event.url.split("/")[1]; 				
				
					if (langName) {
						let currentLang: Lang | null = this.langRepository.xl.find(x => x.name === langName) || null;
						
						if (currentLang) {
							this.langRepository.current = currentLang;
						} else {
							this.langRepository.current = this.langRepository.xl[0];
							this.router.navigateByUrl("/404");
						}						 
					} else {
						this.langRepository.current = this.langRepository.xl[0];
					}					
				}					
			});
	}	
	
	public onScroll(event: any): void {				
		this.stickyVisible = this.wrapper.scrollTop >= 170;	
		this.indicatorWidth = Math.round(100 * this.wrapper.scrollTop / (this.wrapper.scrollHeight - this.wrapper.clientHeight));
	}		
}
