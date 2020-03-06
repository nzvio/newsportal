import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ObjectsModule } from "./objects/objects.module";
import { FilesModule } from "./files/files.module";
import { UsergroupsModule } from "./usergroups/usergroups.module";
import { UsersModule } from "./users/users.module";
import { LangsModule } from "./langs/langs.module";
import { PagesModule } from "./pages/pages.module";
import { CategoriesModule } from "./categories/categories.module";
import { ArticlesModule } from "./articles/articles.module";
import { DonorsModule } from "./donors/donors.module";
import { TargetsModule } from "./targets/targets.module";
import { AdminAPIGateway } from "./admin.api.gateway";

@Module({
    imports: [
        AuthModule,
		ObjectsModule,
		FilesModule,
		UsergroupsModule,
		UsersModule,
		LangsModule,		
		PagesModule,
		CategoriesModule,
		ArticlesModule,
		DonorsModule,
		TargetsModule,
    ],
    providers: [
		AdminAPIGateway,
    ],
})
export class AdminAPIModule {}
