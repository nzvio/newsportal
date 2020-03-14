import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticlesRecommendedComponent } from './sidebar/articles.recommended/articles.recommended.component';
import { CommentsLastComponent } from './sidebar/comments.last/comments.last.component';
import { TagsComponent } from './sidebar/tags/tags.component';

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
        ArticlesRecommendedComponent,
        CommentsLastComponent,
        TagsComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,        
        PaginationComponent,
        ArticlesRecommendedComponent,
        CommentsLastComponent,
        TagsComponent,
    ],
    providers: []
})
export class CCModule {    
}
