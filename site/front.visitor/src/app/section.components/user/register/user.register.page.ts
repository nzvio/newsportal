import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { User } from '../../../model/orm/user.model';
import { UserEditPage } from '../_user.edit.page';
import { UploadService } from '../../../services/upload.service';

@Component({
    selector: "user-register-page",
    templateUrl: "./user.register.page.html",
    styleUrls: ["./user.register.page.scss", "../../../common.styles/tabs.scss", "../../../common.styles/user.forms.scss",],
})
export class UserRegisterPage extends UserEditPage implements OnInit {
    public step: number = 1;
    public user: User = new User().init();
    public loading: boolean = false;
    public errorName: boolean = false;
    public errorEmail: boolean = false;
    public errorPassword: boolean = false;

    constructor(        
        private route: ActivatedRoute,
        protected appService: AppService,
        protected uploadService: UploadService,
    ) {
        super();
    }

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("user-register"));
        });
    }

    private validate(): boolean {
        let error: boolean = false;
        this.user.name = this.user.name.trim();
        this.user.email = this.user.email.trim();

        if (!this.user.email || !this.appService.validateEmail(this.user.email)) {
            this.errorEmail = true;
            error = true;
        } else {
            this.errorEmail = false;
        }

        if (!this.user.name) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }

        if (!this.user.password) {
            this.errorPassword = true;
            error = true;
        } else {
            this.errorPassword = false;
        }

        return !error;
    }

    public async preregister(): Promise<void> {
        if (!this.validate()) {
            return;
        }
    }

    public async register(): Promise<void> {
        
    }
}
