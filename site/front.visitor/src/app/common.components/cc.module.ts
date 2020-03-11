import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesTopComponent } from './articles.top/articles.top.component';
import { ArticlesMainComponent } from './articles.main/articles.main.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,  
        ArticlesTopComponent,      
        ArticlesMainComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,        
        ArticlesTopComponent,      
        ArticlesMainComponent,
    ],
    providers: []
})
export class CCModule {    
}
