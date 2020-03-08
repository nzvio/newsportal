import { Module } from "@nestjs/common";
import { LangsModule } from "./langs/langs.module";
import { PagesModule } from "./pages/pages.module";

@Module({
    imports: [
        LangsModule,
        PagesModule,
    ],
    providers: [
		
    ],
})
export class VisitorAPIModule {}
