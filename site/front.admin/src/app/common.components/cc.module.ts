import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingtableComponent } from './loading-table/loading-table.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ImageviewerComponent } from './imageviewer/imageviewer.component';
import { CheckboxsliderComponent } from './checkbox-slider/checkboxslider.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { AnswerMonitorComponent } from './answer-monitor/answermonitor.component';

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
        ProgressbarComponent,
        ImageviewerComponent,
        CheckboxsliderComponent,
        DatetimePickerComponent,
        AnswerMonitorComponent,
    ],
    exports: [
        HeaderComponent, 
        SidebarComponent,    
        PaginationComponent,  
        LoadingtableComponent,     
        ProgressbarComponent,
        ImageviewerComponent,
        CheckboxsliderComponent,
        DatetimePickerComponent,
        AnswerMonitorComponent,
    ],
    providers: []
})
export class CCModule {    
}
