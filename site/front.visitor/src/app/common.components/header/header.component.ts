import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services/app.service';
import { LangRepository } from '../../services/repositories/lang.repository';
import { Lang } from '../../model/orm/lang.model';
import { PageRepository } from '../../services/repositories/page.repository';
import { Page } from '../../model/orm/page.model';
import { CategoryRepository } from '../../services/repositories/category.repository';
import { Category } from '../../model/orm/category.model';

@Component({
    selector:"the-header", 
    templateUrl: "./header.component.html",     
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {            
    @ViewChild("sticky", {static: false}) sticky: ElementRef;  
    @ViewChild("scrollindicator", {static: false}) scrollindicator: ElementRef;  
    public mmActive: boolean = false;

    constructor(
        private appService: AppService,        
        private langRepository: LangRepository,  
        private pageRepository: PageRepository,
        private categoryRepository: CategoryRepository,
        private router: Router,
    ) {}
    
    get wrapper(): HTMLElement {return this.appService.wrapper;}        
    get isBrowser(): boolean {return this.appService.isBrowser;}
    get url(): string[] {return this.appService.url;}   
    get stickyVisible(): boolean {return this.appService.stickyVisible;} 
    get indicatorWidth(): number {return this.appService.indicatorWidth;}    
    get currentLang(): Lang {return this.langRepository.current.value;}
    get langs(): Lang[] {return this.langRepository.xl;}
    get pages(): Page[] {return this.pageRepository.xl;}
    get categories(): Category[] {return this.categoryRepository.xl;}     

    public async ngAfterViewInit(): Promise<void> {
        if (this.isBrowser) {
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

    public getLangLink(langSlug: string): string {
        let link: string = `/${langSlug}`;        
        let urlParts: string[] = this.router.url.split("/");

        for (let i: number = 2; i < urlParts.length; i++) {
            link += `/${urlParts[i]}`;
        }

        return link;
    }

    public activateSearch(): void {
        this.appService.searchActive.next(true);
    }
}
