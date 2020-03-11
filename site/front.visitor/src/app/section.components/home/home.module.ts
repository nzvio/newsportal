import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CCModule } from '../../common.components/cc.module';

@NgModule({
    imports: [                
        CommonModule,
        CCModule,
    ],
    declarations: [
        HomePage, 
    ],
    exports: [
        HomePage,
    ],
    providers: []
})
export class HomeModule {}
