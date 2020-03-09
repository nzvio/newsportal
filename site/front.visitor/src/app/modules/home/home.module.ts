import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from '../../ui/ui.module';

@NgModule({
    imports: [                
        CommonModule,
        UIModule,
    ],
    declarations: [HomePage],
    exports: [HomePage],
    providers: []
})
export class HomeModule {    
}
