import { Module } from "@nestjs/common";

import { LangsModule } from "./langs/langs.module";
import { PagesModule } from "./pages/pages.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";
import { CommentsModule } from "./comments/comments.module";
import { TagsModule } from "./tags/tags.module";
import { SettingsModule } from "./settings/settings.module";

@Module({
    imports: [
        LangsModule,
        PagesModule,
        CategoriesModule,
        ArticlesModule,
        CommentsModule,
        TagsModule,
        SettingsModule,
    ],    
})
export class VisitorAPIModule {}
