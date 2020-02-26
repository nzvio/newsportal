import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';
import { ModulePage } from '../_module.page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';

@Component({
    selector: "logout-page",
    templateUrl: "./logout.page.html",
})
export class LogoutPage extends ModulePage implements OnInit {
    constructor(protected admlangRepository: AdmLangRepository, private authService: AuthService) {
        super(admlangRepository);
    }

    public ngOnInit(): void {
        setTimeout(() => {
            this.authService.logout();
        }, 1);        
    }
}
