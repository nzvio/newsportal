import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UIModule } from '../../ui/ui.module';
import { CategoryPage } from './category/category.page';
import { ArticlePage } from './article/article.page';

let routes = RouterModule.forChild ([        
    {path:":cat", component: CategoryPage},
    {path:":cat/:article", component: ArticlePage},
]);

@NgModule({
    imports: [
        UIModule,
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
export class CatalogueModule {    
}
