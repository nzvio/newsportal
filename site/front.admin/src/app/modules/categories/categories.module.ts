import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { UIModule } from '../../ui/ui.module';
import { CategoriesListPage } from './list/categories.list.page';
import { CategoriesEditPage } from './edit/categories.edit.page';
import { CategoryComponent } from './category.component';
import { CategoriesCreatePage } from './create/categories.create.page';

let routing = RouterModule.forChild ([        
	{path:"", component: CategoriesListPage, pathMatch: "full"},
	{path:"create", component: CategoriesCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: CategoriesEditPage},
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
		CategoriesListPage,
		CategoriesCreatePage,
		CategoriesEditPage,
		CategoryComponent,
	]    
})
export class CategoriesModule { }
