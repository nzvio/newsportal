import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotfoundPage } from './notfound.page';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        NotfoundPage,
    ],
    exports: [
        NotfoundPage,
    ],    
})
export class NotfoundModule {}
