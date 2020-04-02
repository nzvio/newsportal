import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './services/app.service';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NavHistory } from './model/navhistory';
import { LangRepository } from './services/repositories/lang.repository';
import { Lang } from './model/orm/lang.model';
import { PageRepository } from './services/repositories/page.repository';
import { CategoryRepository } from './services/repositories/category.repository';
import { INotification } from './model/notification.interface';
import { SettingRepository } from './services/repositories/setting.repository';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {				
	@ViewChild("wrap", {static: false}) wrapElement: ElementRef;
	//private navHistory: NavHistory = new NavHistory();
	public langsReady: boolean = false;
	public pagesReady: boolean = false;
	public categoriesReady: boolean = false;
	public settingsReady: boolean = false;

	constructor(
		private appService: AppService,
		private router: Router,		
		private langRepository: LangRepository,
		private pageRepository: PageRepository,
		private categoryRepository: CategoryRepository,
		private settingRepository: SettingRepository,				
	) {}

	get wrapper(): HTMLElement {return this.appService.wrapper;}
	set wrapper(v: HTMLElement) {this.appService.wrapper = v;}		
	get notification(): INotification {return this.appService.notification;}
	get stickyVisible(): boolean {return this.appService.stickyVisible;}
	set stickyVisible(v: boolean) {this.appService.stickyVisible = v;}
	get indicatorWidth(): number {return this.appService.indicatorWidth;}
	set indicatorWidth(v: number) {this.appService.indicatorWidth = v;}

	public ngOnInit(): void {	
		this.initLangs();
		this.pageRepository
			.load()
			.then(() => {this.pagesReady = true;})
			.catch(err => {this.appService.showNotification(err.message, "error")});
		this.categoryRepository
			.load()
			.then(() => {this.categoriesReady = true;})
			.catch(err => {this.appService.showNotification(err.message, "error")});
		this.settingRepository
			.load()
			.then(() => {this.settingsReady = true;})
			.catch(err => {this.appService.showNotification(err.message, "error")});		
	}
	
	public ngAfterViewInit(): void {
		if (this.appService.isBrowser) {
			setTimeout(() => {
				this.wrapper = this.wrapElement.nativeElement as HTMLElement;	
				// this.initNavScrolling();					
				this.router.events
					.pipe(filter(event => event instanceof NavigationEnd))
					.subscribe(event => {setTimeout(() => {this.wrapper.scrollTop = 0;}, 1);});
			}, 1);
		}		
	}

	/*
	!!! we can use "Navigation history" when content is not reloading after every route activation !!!
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
				setTimeout(() => {
					this.wrapper.scrollTo(0, this.navHistory.needScrollTo);
				}, 1);				
			}
		});
	}
	*/

	private async initLangs(): Promise<void> {		
		await this.langRepository.load();		

		if (this.langRepository.xl.length) {			
			this.buildCurrentLang(this.router.url.split("/")[1]);
			this.langsReady = true;
			this.router.events
				.pipe(filter((event: RouterEvent) => event instanceof NavigationStart))
				.subscribe((event: NavigationStart) => {									
					this.buildCurrentLang(event.url.split("/")[1]);
				});
		}		
	}
	
	private buildCurrentLang(urlPart: string): void {
		if (urlPart && urlPart != "404" && urlPart != "403") {
			let currentLang: Lang | null = this.langRepository.xl.find(x => x.name === urlPart) || null;
			
			if (currentLang) {
				this.appService.currentLang.next(currentLang);
			} else {
				this.appService.currentLang.next(this.langRepository.xl[0]);
				this.router.navigateByUrl("/404");
			}						 
		} else {
			this.appService.currentLang.next(this.langRepository.xl[0]);
		}
	}
	
	public onScroll(event: any): void {				
		if (this.wrapper) {
			this.stickyVisible = this.wrapper.scrollTop >= 170;	
			this.indicatorWidth = Math.round(100 * this.wrapper.scrollTop / (this.wrapper.scrollHeight - this.wrapper.clientHeight));
		}		
	}		
}
