import { Injectable } from "@angular/core";
import { IAuthData } from '../model/authdata.interface';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private appService: AppService,
        private dataService: DataService,        
    ) {
        let data: string = localStorage.getItem("authdata");

        if (data) {
            this.authData = JSON.parse(data);
        }
    }

    get authData(): IAuthData | null {return this.dataService.authData;}
    set authData(v: IAuthData) {this.dataService.authData = v;}

    public login(email: string, password: string): void {
        this.dataService.login(email, password).subscribe(res => {
            if (res.statusCode === 200) {
                this.authData = res.data;
                this.save();
                this.appService.monitorLog("login accepted");
                this.router.navigateByUrl("/");
            } else {
                this.appService.monitorLog(res.error, true);
            }
        }, err => {
            this.appService.monitorLog(err.message, true);
        });
    }
    
    public logout(): void {
        this.authData = null;
        localStorage.removeItem("authdata");        
        this.appService.monitorLog("user logged out");        
    }

    private save(): void {
        if (this.authData) {
            localStorage.setItem("authdata", JSON.stringify(this.authData));
            this.appService.monitorLog("auth data saved");
        } 
    }
    
    public updateUser(user: User): void {
        this.authData.user = user;
        this.save();
    }
}
