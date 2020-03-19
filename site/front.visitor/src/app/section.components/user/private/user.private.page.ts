import { Component, OnInit } from "@angular/core";

import { LangRepository } from '../../../services/repositories/lang.repository';
import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: "user-private-page",
    templateUrl: "./user.private.page.html",
    styleUrls: ["../user.forms.scss"],
})
export class UserPrivatePage implements OnInit {    
    constructor(
        private langRepository: LangRepository,
        private route: ActivatedRoute,
        private appService: AppService,
        private authService: AuthService,
    ) {}

    get currentLang(): Lang {return this.langRepository.current.value;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("user-private"));
        });
    }    

    private validate(): boolean {
        let error: boolean = false;
        return !error;
    }
}
