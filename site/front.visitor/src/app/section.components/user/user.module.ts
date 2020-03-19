import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginPage } from './login/user.login.page';
import { CCModule } from '../../common.components/cc.module';
import { FormsModule } from '@angular/forms';
import { UserPrivatePage } from './private/user.private.page';
import { AuthGuard } from '../../services/auth.guard';

let routes = RouterModule.forChild ([        
    {path: "login", component: UserLoginPage, pathMatch: "full"},    
    {path: "private", component: UserPrivatePage, pathMatch: "full", canActivate: [AuthGuard]},    
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
    ],
    exports: [
        UserLoginPage,
        UserPrivatePage,
    ],    
})
export class UserModule {}
