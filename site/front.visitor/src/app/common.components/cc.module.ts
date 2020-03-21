import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticlesRecommendedComponent } from './sidebar/articles.recommended/articles.recommended.component';
import { CommentsLastComponent } from './sidebar/comments.last/comments.last.component';
import { TagsComponent } from './sidebar/tags/tags.component';
import { SearchComponent } from './search/search.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,  
        PaginationComponent,
        ArticlesRecommendedComponent,
        CommentsLastComponent,
        TagsComponent,
        SearchComponent,
        ProgressbarComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,        
        PaginationComponent,
        ArticlesRecommendedComponent,
        CommentsLastComponent,
        TagsComponent,
        SearchComponent,
        ProgressbarComponent,
    ],    
})
export class CCModule {    
}
