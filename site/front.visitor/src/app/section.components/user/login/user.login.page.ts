import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: "user-login-page",
    templateUrl: "./user.login.page.html",
    styleUrls: ["../user.forms.scss"],
})
export class UserLoginPage implements OnInit {
    public email: string = "";
    public password: string = "";
    public errorEmail: boolean = false;
    public errorPassword: boolean = false;
    public loading: boolean = false;    
    
    constructor(        
        private route: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private authService: AuthService,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get isBrowser(): boolean {return this.appService.isBrowser;}

    public ngOnInit(): void {
        if (this.authService.authenticated) {
            this.router.navigateByUrl(`/${this.currentLang.slug}/user/private`);
        } else {
            this.route.params.subscribe(() => {
                this.appService.setTitle(this.currentLang.s("user-login"));
            });            
        }        
    }

    public async login(): Promise<void> {
        if (!this.validate()) {
            return;
        }        
            
        try {
            this.loading = true;
            const status: number = await this.authService.login(this.email, this.password);
            this.loading = false;

            if (status === 200) {
                this.appService.showNotification(this.currentLang.s("user-login-ok"));
                this.router.navigateByUrl(`/${this.currentLang.slug}/user/private`);
            } else {
                this.appService.showNotification(this.currentLang.s("user-login-failed"), "error");
            }
        } catch (err) {
            this.appService.showNotification(err, "error");
            this.loading = false;
        }        
    }

    private validate(): boolean {
        let error: boolean = false;
        this.email = this.email.trim();

        if (!this.email || !this.appService.validateEmail(this.email)) {
            this.errorEmail = true;
            error = true;
        } else {
            this.errorEmail = false;
        }

        if (!this.password) {
            this.errorPassword = true;
            error = true;
        } else {
            this.errorPassword = false;
        }

        return !error;
    }
}
