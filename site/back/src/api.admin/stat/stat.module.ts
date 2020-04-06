import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { StatController } from "./stat.controller";
import { StatService } from "./stat.service";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}]),     
        JwtModule.register(jwtConstants),   
    ],
    controllers: [StatController],
    providers: [StatService],
})
export class StatModule {}
