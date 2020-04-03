import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { CommentSchema } from "../../model/orm/schemas/comment.schema";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentVoteSchema } from "../../model/orm/schemas/commentvote.schema";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        JwtModule.register(jwtConstants),
        MongooseModule.forFeature([
            {name: 'Comment', schema: CommentSchema},                        
            {name: 'CommentVote', schema: CommentVoteSchema},                        
        ]),        
    ],
    controllers: [CommentsController],
    providers: [CommentsService],    
    exports: [CommentsService],
})
export class CommentsModule {}
