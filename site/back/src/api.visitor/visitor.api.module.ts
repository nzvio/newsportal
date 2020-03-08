import { Module } from "@nestjs/common";

import { LangsModule } from "./langs/langs.module";
import { PagesModule } from "./pages/pages.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
    imports: [
        LangsModule,
        PagesModule,
        CategoriesModule,
    ],
    providers: [
		
    ],
})
export class VisitorAPIModule {}
