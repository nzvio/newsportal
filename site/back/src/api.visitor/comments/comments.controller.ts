import { Controller, Post, Body } from "@nestjs/common";

import { CommentsService } from "./comments.service";
import { IAnswer } from "../../model/answer.interface";
import { CommentsGetchunkDTO } from "./dto/comments.getchunk.dto";
import { IComment } from "../../model/orm/interfaces/comment.interface";

@Controller('api/visitor/comments')
export class CommentsController {
    constructor (private commentsService: CommentsService) {}

    // get fragment
    @Post("chunk")
    public chunk(@Body() dto: CommentsGetchunkDTO): Promise<IAnswer<IComment[]>> {
        return this.commentsService.chunk(dto);
    }

    // get fragment by article
    @Post("chunkbyarticle")
    public chunkByArticle(@Body() dto: CommentsGetchunkDTO): Promise<IAnswer<IComment[]>> {
        return this.commentsService.chunkByArticle(dto);
    }
}
