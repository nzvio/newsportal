import { NgModule } from '@angular/core';
//import { EditorModule } from '@tinymce/tinymce-angular';

import { HomePage } from './home.page';
import { CCModule } from '../../common.components/cc.module';

@NgModule({	
    imports: [	
//		EditorModule,	
		CCModule,
	],
	declarations: [
		HomePage,
	],
    providers: [],    
})
export class HomeModule { }
