import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CCModule } from '../../common.components/cc.module';
import { ArticlesListComponent } from "./articles.list.component";
import { CatalogueCategoryPage } from './category/catalogue.category.page';
import { CatalogueArticlePage } from './article/catalogue.article.page';
import { CatalogueUserPage } from './user/catalogue.user.page';
import { CatalogueSearchPage } from './search/catalogue.search.page';
import { CatalogueTagPage } from './tag/catalogue.tag.page';
import { OtherArticlesComponent } from './article/otherarticles.component';
import { CommentsComponent } from './article/comments.component';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

let routes = RouterModule.forChild ([        
    {path: "category/:category", component: CatalogueCategoryPage},
    {path: "category/:category/:article", component: CatalogueArticlePage},
    {path: "user/:user", component: CatalogueUserPage},
    {path: "tag/:tag", component: CatalogueTagPage},
    {path: "search", component: CatalogueSearchPage, pathMatch: "full"}
]);

@NgModule({
    imports: [
        CCModule,
        CommonModule,
        FormsModule,
        EditorModule,
        routes,
    ],
    declarations: [
        ArticlesListComponent,
        OtherArticlesComponent,
        CommentsComponent,
        CatalogueCategoryPage,
        CatalogueArticlePage,
        CatalogueUserPage,
        CatalogueSearchPage,
        CatalogueTagPage,        
    ],
    exports: [
        CatalogueCategoryPage,
        CatalogueArticlePage,
        CatalogueUserPage,
        CatalogueSearchPage,
        CatalogueTagPage,
    ],    
})
export class CatalogueModule {}
