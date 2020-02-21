import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

import { HomePage } from './home.page';
import { UIModule } from '../../ui/ui.module';

@NgModule({	
    imports: [	
		EditorModule,	
		UIModule,
	],
	declarations: [
		HomePage,
	],
    providers: [],    
})
export class HomeModule { }
