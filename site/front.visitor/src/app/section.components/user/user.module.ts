import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginPage } from './login/user.login.page';
import { CCModule } from '../../common.components/cc.module';
import { FormsModule } from '@angular/forms';
import { UserPrivatePage } from './private/user.private.page';
import { AuthGuard } from '../../services/auth.guard';
import { UserLogoutPage } from './logout/user.logout.page';
import { UserRegisterPage } from './register/user.register.page';
import { UserRecoveryPage } from './recovery/user.recovery.page';

let routes = RouterModule.forChild ([        
    {path: "login", component: UserLoginPage, pathMatch: "full"},    
    {path: "private", component: UserPrivatePage, pathMatch: "full", canActivate: [AuthGuard]},    
    {path: "logout", component: UserLogoutPage, pathMatch: "full"},    
    {path: "register", component: UserRegisterPage, pathMatch: "full"},
    {path: "recovery", component: UserRecoveryPage, pathMatch: "full"},
]);

@NgModule({
    imports: [        
        CommonModule,
        FormsModule,
        routes,
        CCModule,
    ],
    declarations: [
        UserLoginPage,
        UserPrivatePage,
        UserLogoutPage,
        UserRegisterPage,
        UserRecoveryPage,
    ],
    exports: [
        UserLoginPage,
        UserPrivatePage,
        UserLogoutPage,
        UserRegisterPage,
        UserRecoveryPage,
    ],    
})
export class UserModule {}
