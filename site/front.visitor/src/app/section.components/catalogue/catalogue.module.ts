import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CCModule } from '../../common.components/cc.module';
import { CatalogueCategoryPage } from './category/catalogue.category.page';
import { CatalogueArticlePage } from './article/catalogue.article.page';
import { CatalogueUserPage } from './user/catalogue.user.page';
import { CommonModule } from '@angular/common';

let routes = RouterModule.forChild ([        
    {path:"category/:category", component: CatalogueCategoryPage},
    {path:"category/:category/:article", component: CatalogueArticlePage},
    {path:"user/:user", component: CatalogueUserPage},
]);

@NgModule({
    imports: [
        CCModule,
        CommonModule,
        routes,
    ],
    declarations: [
        CatalogueCategoryPage,
        CatalogueArticlePage,
        CatalogueUserPage,
    ],
    exports: [
        CatalogueCategoryPage,
        CatalogueArticlePage,
        CatalogueUserPage,
    ],    
})
export class CatalogueModule {}
