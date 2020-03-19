import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotfoundPage } from './notfound.page';
import { ForbiddenPage } from './forbidden.page';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        NotfoundPage,
        ForbiddenPage,
    ],
    exports: [
        NotfoundPage,
        ForbiddenPage,
    ],    
})
export class ErrorsModule {}
