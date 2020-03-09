import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomegalLoaderComponent } from './loaders/homegal-loader/homegal-loader.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HomegalLoaderComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HomegalLoaderComponent,
    ],
    providers: []
})
export class UIModule {    
}
