import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesTopComponent } from './articles.top/articles.top.component';
import { ArticlesMainComponent } from './articles.main/articles.main.component';
import { ArticlesPopularComponent } from './articles.popular/articles.popular.component';
import { ArticlesLastComponent } from './articles.last/articles.last.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,  
        PaginationComponent,
        ArticlesTopComponent,      
        ArticlesMainComponent,
        ArticlesPopularComponent,
        ArticlesLastComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,        
        PaginationComponent,
        ArticlesTopComponent,      
        ArticlesMainComponent,
        ArticlesPopularComponent,
        ArticlesLastComponent,
    ],
    providers: []
})
export class CCModule {    
}
