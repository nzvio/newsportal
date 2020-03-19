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
        if (res.statusCode === 200 || res.statusCode === 401) {
            return true;
        }

        (res.error) ? setTimeout(() => {this.appService.showNotification(res.error, "error");}, 1000) : null;
        
        if (res.statusCode === 403) {                
            this.router.navigateByUrl("/403");
        }

        if (res.statusCode === 404) {                
            this.router.navigateByUrl("/404");            
        }        
        
        return false;
    }
}
