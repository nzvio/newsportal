import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { User } from '../../../model/orm/user.model';
import { UserEditPage } from '../_user.edit.page';
import { UploadService } from '../../../services/upload.service';
import { IPreregisterDTO } from '../../../model/dto/preregister.dto';
import { UserRepository } from '../../../services/repositories/user.repository';
import { IRegisterDTO } from '../../../model/dto/register.dto';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: "user-register-page",
    templateUrl: "./user.register.page.html",
    styleUrls: ["./user.register.page.scss", "../../../common.styles/tabs.scss", "../../../common.styles/user.forms.scss",],
})
export class UserRegisterPage extends UserEditPage implements OnInit {
    public step: number = 1;
    public user: User = new User().init();
    public code: string = "";
    public loading: boolean = false;
    public errorName: boolean = false;
    public errorEmail: boolean = false;
    public errorPassword: boolean = false;
    public errorCode: boolean = false;
    public status: string = "&nbsp;";
    public statusError: boolean = false;

    constructor(        
        private route: ActivatedRoute,
        private userRepository: UserRepository,
        private authService: AuthService,
        private router: Router,
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

    private validateStep1(): boolean {
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

    private validateStep2(): boolean {
        let error: boolean = false;

        if (this.code.length != 6) {
            this.errorCode = true;
            error = true;
        } else {
            this.errorCode = false;
        }

        return !error;
    }

    public toStep1(): void {
        this.step = 1;
        this.status = "&nbsp;";
        this.statusError = false;
    }
    
    public async toStep2(): Promise<void> {        
        if (!this.validateStep1()) {
            return;
        }

        try {            
            this.loading = true;
            this.status = this.currentLang.s("user-register-verification");
            const dto: IPreregisterDTO = {email: this.user.email, lang: this.currentLang._id};
            await this.userRepository.preregister(dto);
            this.step = 2;
            this.code = "";
            this.loading = false;
            this.status = "&nbsp;";
        } catch (err) {
            if (String(err) === "email duplication") {                
                this.errorEmail = true; 
                this.status = this.currentLang.s("user-private-duplicateemail");
                this.statusError = true;
                setTimeout(() => {
                    this.errorEmail = false;
                    this.status = "&nbsp";
                    this.statusError = false;
                }, 5000);
            } else {
                this.appService.showNotification(err, "error");
                this.status = "&nbsp;";                
            }            
            
            this.loading = false;           
        }
    }

    public async register(): Promise<void> {
        if (!this.validateStep2()) {
            return;
        }

        try {
            this.loading = true;
            this.status = this.currentLang.s("user-register-codechecking");
            const dto: IRegisterDTO = {user: this.user, code: this.code};
            await this.userRepository.register(dto);

            if (await this.authService.login(this.user.email, this.user.password) === 200) {
                this.appService.showNotification(this.currentLang.s("user-login-ok"));
                this.router.navigateByUrl(`/${this.currentLang.slug}/user/private`);
            } else {
                this.appService.showNotification(this.currentLang.s("user-login-failed"), "error");
            }
        } catch (err) {
            if (String(err) === "invalid code") {                
                this.errorCode = true; 
                this.status = this.currentLang.s("user-register-codefailed");
                this.statusError = true;
                setTimeout(() => {
                    this.errorEmail = false;
                    this.status = "&nbsp";
                    this.statusError = false;
                }, 5000);
            } else {
                this.appService.showNotification(err, "error");
                this.status = "&nbsp;";                
            }            
            
            this.loading = false;   
        }
    }
}
