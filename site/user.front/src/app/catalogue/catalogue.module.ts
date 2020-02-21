import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UIModule } from '../ui/ui.module';
import { CategoryPage } from './category/category.page';
import { ArticlePage } from './article/article.page';

let routing = RouterModule.forChild (
    [        
        {path:":cat", component: CategoryPage},
        {path:":cat/:article", component: ArticlePage},
    ]
);

@NgModule({
    imports: [
        UIModule,
        routing,
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
