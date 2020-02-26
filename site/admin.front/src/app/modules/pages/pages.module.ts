import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { UIModule } from '../../ui/ui.module';
import { PagesListPage } from './list/pages.list.page';
import { PagesEditPage } from './edit/pages.edit.page';
import { PageComponent } from './page.component';
import { PagesCreatePage } from './create/pages.create.page';

let routing = RouterModule.forChild ([        
	{path:"", component: PagesListPage, pathMatch: "full"},
	{path:"create", component: PagesCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: PagesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		EditorModule,
		UIModule,
		routing,
	],
	declarations: [
		PagesListPage,
		PagesCreatePage,
		PagesEditPage,
		PageComponent,
	]    
})
export class PagesModule { }
