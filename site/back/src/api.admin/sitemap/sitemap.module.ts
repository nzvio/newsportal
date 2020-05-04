import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { jwtConstants } from "../auth/auth.constants";
import { SitemapService } from "./sitemap.service";
import { SitemapController } from "./sitemap.controller";
import { SettingSchema } from "../../model/orm/schemas/setting.schema";
import { LangSchema } from "../../model/orm/schemas/lang.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Article', schema: ArticleSchema},
            {name: 'Setting', schema: SettingSchema},
            {name: 'Lang', schema: LangSchema}
        ]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [SitemapController],
    providers: [SitemapService],    
})
export class SitemapModule {}
