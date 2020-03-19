import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LangRepository } from './repositories/lang.repository';
import { Lang } from '../model/orm/lang.model';

@Injectable()
export class AuthGuard {
    constructor (
        private authService: AuthService,
        private langRepository: LangRepository,
        private router: Router,
    ) { }

    get currentLang(): Lang {return this.langRepository.current.value;}
    
    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {        
        if (this.authService.authenticated) {
            return true;
        } else {            
            this.router.navigateByUrl (`/${route.params["lang"]}/user/login`);
            return false;
        }        
    }
}
