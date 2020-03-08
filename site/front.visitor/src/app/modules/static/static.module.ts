import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticPage } from './static.page';
import { CommonModule } from '@angular/common';

let routes = RouterModule.forChild ([        
    {path:"", component: StaticPage},        
]);

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
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
export class StaticModule {}
