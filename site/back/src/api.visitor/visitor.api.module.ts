import { Module } from "@nestjs/common";
import { LangsModule } from "./langs/langs.module";

@Module({
    imports: [
        LangsModule,
    ],
    providers: [
		
    ],
})
export class VisitorAPIModule {}
