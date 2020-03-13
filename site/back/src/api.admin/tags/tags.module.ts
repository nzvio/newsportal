import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { TagSchema } from "../../schemas/tag.schema";
import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Tag', schema: TagSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [TagsController],
    providers: [TagsService],    
})
export class TagsModule {}
