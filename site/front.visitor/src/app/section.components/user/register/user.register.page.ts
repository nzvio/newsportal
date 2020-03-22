import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';

@Component({
    selector: "user-register-page",
    templateUrl: "./user.register.page.html",
    styleUrls: ["./user.register.page.scss", "../../../common.styles/tabs.scss"],
})
export class UserRegisterPage implements OnInit {
    public step: number = 1;

    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("user-register"));
        });
    }
}
