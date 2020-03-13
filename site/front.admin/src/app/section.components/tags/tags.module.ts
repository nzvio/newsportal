import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { TagsListPage } from "./list/tags.list.page";
import { TagsCreatePage } from "./create/tags.create.page";
import { TagsEditPage } from "./edit/tags.edit.page";
import { TagComponent } from "./tag.component";

let routing = RouterModule.forChild ([        
	{path:"", component: TagsListPage, pathMatch: "full"},
	{path:"create", component: TagsCreatePage, pathMatch: "full"},
	{path:"edit/:_id", component: TagsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		TagsListPage,
		TagsCreatePage,
		TagsEditPage,
		TagComponent,
	],    
})
export class TagsModule {}
