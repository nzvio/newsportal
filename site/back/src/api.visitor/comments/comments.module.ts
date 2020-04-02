import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CommentSchema } from "../../model/orm/schemas/comment.schema";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Comment', schema: CommentSchema},                        
        ]),        
    ],
    controllers: [CommentsController],
    providers: [CommentsService],    
    exports: [CommentsService],
})
export class CommentsModule {}
