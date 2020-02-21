import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
    ],
    providers: []
})
export class UIModule {    
}
