import { Component, OnInit } from "@angular/core";

import { LangRepository } from '../../../services/repositories/lang.repository';
import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/orm/user.model';

@Component({
    selector: "user-private-page",
    templateUrl: "./user.private.page.html",
    styleUrls: ["../user.forms.scss", "./user.private.page.scss"],
})
export class UserPrivatePage implements OnInit {    
    public ready: boolean = false;
    public tab: number = 1;

    constructor(
        private langRepository: LangRepository,
        private route: ActivatedRoute,
        private appService: AppService,
        private authService: AuthService,
    ) {}

    get currentLang(): Lang {return this.langRepository.current.value;}
    get user(): User {return this.authService.authData.user;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.ready = false;
            this.appService.setTitle(this.currentLang.s("user-private"));            




            this.ready = true;
        });
    }    

    private validate(): boolean {
        let error: boolean = false;
        return !error;
    }    
}
