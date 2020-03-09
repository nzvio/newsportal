import { Module } from "@nestjs/common";

import { LangsModule } from "./langs/langs.module";
import { PagesModule } from "./pages/pages.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";

@Module({
    imports: [
        LangsModule,
        PagesModule,
        CategoriesModule,
        ArticlesModule,
    ],
    providers: [
		
    ],
})
export class VisitorAPIModule {}
