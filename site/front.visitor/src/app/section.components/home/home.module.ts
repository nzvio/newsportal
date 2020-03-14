import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CCModule } from '../../common.components/cc.module';
import { ArticlesTopComponent } from './articles.top/articles.top.component';
import { ArticlesMainComponent } from './articles.main/articles.main.component';
import { ArticlesPopularComponent } from './articles.popular/articles.popular.component';
import { ArticlesLastComponent } from './articles.last/articles.last.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [                
        CommonModule,
        RouterModule,
        CCModule,        
    ],
    declarations: [
        HomePage, 
        ArticlesTopComponent,
        ArticlesMainComponent,
        ArticlesPopularComponent,
        ArticlesLastComponent,        
    ],
    exports: [
        HomePage,
    ],
    providers: []
})
export class HomeModule {}
