import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { AppService } from './app.service';

@Injectable()
export class ErrorService {
    constructor(
        private router: Router,
        private appService: AppService,
    ) {}

    public processResponse(res: any): boolean {        
        if (res.statusCode === 200) {
            return true;
        }
        
        if (res.statusCode === 403) {                
            this.router.navigateByUrl("/auth/logout");
        }

        if (res.statusCode === 404) {                
            this.router.navigateByUrl("/404");
        }
        
        (res.error) ? this.appService.showNotification(res.error, "error") : null;
        return false;
    }
}
