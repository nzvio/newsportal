import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ArticleSchema } from "../../schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}]),        
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],    
})
export class ArticlesModule {}
