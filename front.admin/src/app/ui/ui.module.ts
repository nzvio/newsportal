import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingtableComponent } from './loading-table/loading-table.component';

@NgModule({
    imports: [             
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        HeaderComponent,    
        SidebarComponent,        
        PaginationComponent, 
        LoadingtableComponent,
    ],
    exports: [
        HeaderComponent, 
        SidebarComponent,    
        PaginationComponent,  
        LoadingtableComponent,     
    ],
    providers: []
})
export class UIModule {    
}
