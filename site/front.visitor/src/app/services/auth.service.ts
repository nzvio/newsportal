import { Injectable } from "@angular/core";

import { IAuthData } from '../model/authdata.interface';
import { DataService } from './data.service';
import { User } from '../model/orm/user.model';
import { AppService } from './app.service';

@Injectable()
export class AuthService {
    constructor(
        private dataService: DataService,
        private appService: AppService,
    ) {
        if (this.appService.isBrowser) {
            const data: string = localStorage.getItem("authdata");

            if (data) {
                const parsedData: any = JSON.parse(data);
                this.authData = {user: new User().build(parsedData.user), token: parsedData.token};                
            } else {
                this.authData = null;
            }            
        }        
    }

    get authData(): IAuthData | null {return this.dataService.authData;}
    set authData(v: IAuthData) {this.dataService.authData = v;}
    get authenticated(): boolean {return this.dataService.authData !== null;}

    public login(email: string, password: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.dataService.login(email, password).subscribe(res => {
                if (res.statusCode === 200) {                    
                    this.authData = {user: new User().build(res.data.user), token: res.data.token};
                    this.save();                       
                } 

                resolve(res.statusCode);
            }, err => {
                reject(err.message);
            });
        });        
    }
    
    public logout(): void {
        this.authData = null;
        
        if (this.appService.isBrowser) {
            localStorage.removeItem("authdata");                
        }        
    }

    public save(): void {
        if (this.appService.isBrowser && this.authData) {            
            localStorage.setItem("authdata", JSON.stringify(this.authData));            
        } 
    }    
}
