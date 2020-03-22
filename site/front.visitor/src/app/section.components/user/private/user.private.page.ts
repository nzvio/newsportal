import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/orm/user.model';
import { UserRepository } from '../../../services/repositories/user.repository';
import { IHTMLInputEvent } from '../../../model/htmlinputevent.interface';
import { UploadService } from '../../../services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { IAnswer } from '../../../model/answer.interface';
import { IImagable } from '../../../model/imagable.interface';
import { UserEditPage } from '../_user.edit.page';

@Component({
    selector: "user-private-page",
    templateUrl: "./user.private.page.html",
    styleUrls: ["../../../common.styles/user.forms.scss", "../../../common.styles/tabs.scss", "../../../common.styles/user.info.scss", "./user.private.page.scss"],
})
export class UserPrivatePage extends UserEditPage implements OnInit {        
    public tab: number = 1;
    public loading: boolean = false;
    public errorName: boolean = false;
    public errorEmail: boolean = false;
    
    constructor(        
        private route: ActivatedRoute,       
        private authService: AuthService,
        private userRepository: UserRepository,
        protected uploadService: UploadService,
        protected appService: AppService,
    ) {
        super();
    }
    
    get user(): User {return this.authService.authData.user;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {            
            this.appService.setTitle(this.currentLang.s("user-private"));                   
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

        return !error;
    } 
    
    public async update(): Promise<void> {
        if (!this.validate()) {
            return;
        }

        try {
            this.loading = true;
            await this.userRepository.update(this.user);
            delete this.user.password;
            this.authService.save();
            this.loading = false;       
            this.appService.showNotification(this.currentLang.s("user-private-saved"));
        } catch (err) {
            String(err).includes("E11000") ? err = this.currentLang.s("user-private-duplicateemail") : null;
            this.appService.showNotification(err, "error");            
            this.loading = false;
        }
    }

    
}
