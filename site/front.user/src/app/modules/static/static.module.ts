import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticPage } from './static.page';

let routes = RouterModule.forChild ([        
    {path:"", component: StaticPage},        
]);

@NgModule({
    imports: [
        RouterModule,
        routes,
    ],
    declarations: [
        StaticPage,
    ],
    exports: [
        StaticPage,
    ],
    providers: []
})
export class StaticModule {    
}
