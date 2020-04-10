import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { StatController } from "./stat.controller";
import { StatService } from "./stat.service";
import { jwtConstants } from "../auth/auth.constants";
import { CategorySchema } from "../../model/orm/schemas/category.schema";
import { LangSchema } from "../../model/orm/schemas/lang.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Article', schema: ArticleSchema},
            {name: 'Category', schema: CategorySchema},
            {name: 'Lang', schema: LangSchema},
        ]),     
        JwtModule.register(jwtConstants),   
    ],
    controllers: [StatController],
    providers: [StatService],
})
export class StatModule {}
