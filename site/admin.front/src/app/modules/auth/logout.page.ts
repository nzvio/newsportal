import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: "logout-page",
    templateUrl: "./logout.page.html",
})
export class LogoutPage implements OnInit {
    constructor(private authService: AuthService) {}

    public ngOnInit(): void {
        setTimeout(() => {
            this.authService.logout();
        }, 1);        
    }
}
