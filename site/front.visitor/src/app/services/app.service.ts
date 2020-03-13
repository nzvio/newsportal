import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { INotification } from '../model/notification.interface';

@Injectable()
export class AppService {
    public wrapper: HTMLElement;
    public url: string[] = [];
    public notification: INotification = {active: false, content: "", status: "info"};
    public notificationTimer: number = null;
    public stickyVisible: boolean = false;
    public indicatorWidth: number = 0;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
    ) {
        this.initURLRoutine();
    }

    get isBrowser(): boolean {return isPlatformBrowser(this.platformId);} 
    get isServer(): boolean {return isPlatformServer(this.platformId);}

    private initURLRoutine(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {this.url = event.url.split("/")});
    }

    public smoothScroll (from: number, to: number, duration: number, element: HTMLElement): void {		
		let change: number = to - from;
        let currentTime: number = 0;
		let increment: number = 10;		
        let animateScroll = () => {        
                currentTime += increment;
                let val: number = this.easeInOutQuad(currentTime, from, change, duration);
                element.scrollTo(0, val);
                
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }                
        	};

        animateScroll();
	}

	private easeInOutQuad (t:number, b:number, c:number, d:number): number {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    public showNotification (content: string, status: string = "info"): void {
        if (this.isBrowser) {
            if (this.notificationTimer) {
                clearTimeout (this.notificationTimer);
            }
    
            this.notification.content = content;
            this.notification.status = status;
            this.notification.active = true;
            this.notificationTimer = window.setTimeout (() => {
                this.notification.active = false;
                this.notificationTimer = null;
            }, 2000);
        }        
    }     

    public setMeta(name: string, content: string): void {
        this.metaService.removeTag (`name="${name}"`);
        
        if (content) {
            this.metaService.addTag ({name: name, content: content});
        }            
    }

    public setTitle (title: string) {
        this.titleService.setTitle(this.decodeHTMLEntities(title));
    }

    public decodeHTMLEntities(text: string): string {
        let entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];
    
        for (let i: number = 0, max: number = entities.length; i < max; ++i) {
            text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
        }            
    
        return text;
    }
}
