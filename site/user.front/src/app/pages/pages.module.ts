import { NgModule } from '@angular/core';
import { Page404 } from './404/404.page';
import { RouterModule } from '@angular/router';
import { StaticPage } from './static/static.page';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        Page404,
        StaticPage,
    ],
    exports: [
        Page404,
        StaticPage,
    ],
    providers: []
})
export class PagesModule {    
}
