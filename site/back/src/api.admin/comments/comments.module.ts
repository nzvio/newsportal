import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { CommentSchema } from "../../model/orm/schemas/comment.schema";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Comment', schema: CommentSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],    
})
export class CommentsModule {}
