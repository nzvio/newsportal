import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { IRecoveryDTO } from 'src/app/model/dto/recovery.dto';
import { UserRepository } from 'src/app/services/repositories/user.repository';

@Component({
    selector: "user-recovery-page",
    templateUrl: "./user.recovery.page.html",   
    styleUrls: ["./user.recovery.page.scss", "../../../common.styles/user.forms.scss"],
})
export class UserRecoveryPage implements OnInit {    
    public email: string = "";
    public errorEmail: boolean = false;
    public loading: boolean = false;
    public status: string = "&nbsp;";
    public statusError: boolean = false;
    public sent: boolean = false;

    constructor(        
        private route: ActivatedRoute,     
        private appService: AppService,     
        private userRepository: UserRepository,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public ngOnInit(): void {        
        this.route.params.subscribe(() => {
            this.appService.setTitle(this.currentLang.s("user-recovery"));
        });                
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

        return !error;
    }

    public async recover(): Promise<void> {
        if (!this.validate()) {
            return;
        }

        try {
            this.loading = true;
            this.status = this.currentLang.s("user-recovery-checking");
            const dto: IRecoveryDTO = {email: this.email, lang: this.currentLang._id};
            await this.userRepository.recover(dto);
            this.loading = false;
            this.sent = true;
        } catch (err) {
            if (String(err) === "e-mail not found") {
                this.errorEmail = true; 
                this.status = this.currentLang.s("user-recovery-failed");
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
