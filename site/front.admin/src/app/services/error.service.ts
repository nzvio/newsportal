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
        if (res.statusCode === 403) {
            (res.error) ? this.appService.monitorLog(res.error, true) : null;
            this.router.navigateByUrl("/auth/logout");
            return false;
        } else {
            return true;
        }        
    }
}
