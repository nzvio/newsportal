import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryPage } from './category/category.page';
import { ArticlePage } from './article/article.page';
import { CCModule } from '../../common.components/cc.module';

let routes = RouterModule.forChild ([        
    {path:":cat", component: CategoryPage},
    {path:":cat/:article", component: ArticlePage},
]);

@NgModule({
    imports: [
        CCModule,
        routes,
    ],
    declarations: [
        CategoryPage,
        ArticlePage,
    ],
    exports: [
        CategoryPage,
        ArticlePage,
    ],
    providers: []
})
export class CatalogueModule {}
