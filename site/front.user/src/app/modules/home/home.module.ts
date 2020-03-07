import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

import { UIModule } from '../../ui/ui.module';

@NgModule({
    imports: [                
        UIModule,
    ],
    declarations: [HomePage],
    exports: [HomePage],
    providers: []
})
export class HomeModule {    
}
