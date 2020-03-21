import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: "user-logout-page",
    templateUrl: "./user.logout.page.html",    
})
export class UserLogoutPage implements OnInit {    
    constructor(        
        private route: ActivatedRoute,     
        private appService: AppService,
        private authService: AuthService,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public ngOnInit(): void {        
        this.authService.logout();
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("user-logout"));
        });                
    }   
}
