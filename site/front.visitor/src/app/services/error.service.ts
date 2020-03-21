import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { AppService } from './app.service';
import { Lang } from '../model/orm/lang.model';

@Injectable()
export class ErrorService {
    constructor(
        private router: Router,
        private appService: AppService,             
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public processResponse(res: any): boolean {        
        if (res.statusCode === 403) {                
            setTimeout(() => {this.appService.showNotification(res.error, "error");}, 1000);
            this.router.navigateByUrl(`/${this.currentLang.slug}/user/logout`);
            return false;
        }
        
        return true;                
    }
}
