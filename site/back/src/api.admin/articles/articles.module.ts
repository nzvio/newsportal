import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ArticleSchema } from "../../schemas/article.schema";
import { jwtConstants } from "../auth/auth.constants";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],    
})
export class ArticlesModule {}
