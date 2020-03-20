import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { CategorySchema } from "../../model/orm/schemas/category.schema";
import { VoteSchema } from "../../model/orm/schemas/vote.schema";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        JwtModule.register(jwtConstants),
        MongooseModule.forFeature([
            {name: 'Article', schema: ArticleSchema},
            {name: 'Category', schema: CategorySchema},
            {name: 'Vote', schema: VoteSchema},
        ]),        
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],    
})
export class ArticlesModule {}
