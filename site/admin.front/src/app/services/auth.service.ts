import { Injectable } from "@angular/core";
import { AuthData } from '../model/authdata.interface';

@Injectable()
export class AuthService {
    public authData: AuthData | null = null;

    constructor() {
        let data: string = localStorage.getItem("authdata");

        if (data) {
            this.authData = JSON.parse(data);
        }
    }

    public logout(): void {
        this.authData = null;
        localStorage.removeItem("authdata");
    }

    private save(): void {
        if (this.authData) {
            localStorage.setItem("authdata", JSON.stringify(this.authData));
        } 
    }
}
