import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { AppService } from '../../services/app.service';
import { Lang } from '../../model/orm/lang.model';

@Component({
    selector: "the-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
    public search: string = "";
    @ViewChild("searchinput", {static: false}) searchinput: ElementRef;

    constructor(
        private appService: AppService,        
        private router: Router,
    ) {}

    get active(): boolean {return this.appService.searchActive.value;}    
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.appService.searchActive.subscribe(active => {
            active ? (this.searchinput.nativeElement as HTMLElement).focus() : null;
        });            
    }

    public onClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).id != "search-input") {
            this.appService.searchActive.next(false);
        }
    }

    public onKeyup(event: KeyboardEvent): void {
        if (event.keyCode === 13) {
            this.search = this.search.trim();
        
            if (this.search) {
                this.appService.searchKeyword.next(this.search);
                this.appService.searchActive.next(false);
                this.router.navigateByUrl(`/${this.currentLang.slug}/catalogue/search`);
            }  
        }
    }
}
