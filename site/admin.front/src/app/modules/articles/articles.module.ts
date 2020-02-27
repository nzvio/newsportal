import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { UIModule } from '../../ui/ui.module';
import { ArticlesListPage } from './list/articles.list.page';
//import { ArticlesEditPage } from './edit/articles.edit.page';
//import { ArticleComponent } from './article.component';
//import { ArticlesCreatePage } from './create/articles.create.page';

let routing = RouterModule.forChild ([        
	{path:"", component: ArticlesListPage, pathMatch: "full"},
//	{path:"create", component: ArticlesCreatePage, pathMatch: "full"},
	//{path:"edit/:_id", component: ArticlesEditPage},
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
		ArticlesListPage,
//		ArticlesCreatePage,
//		ArticlesEditPage,
//		ArticleComponent,
	]    
})
export class ArticlesModule { }
