import { Controller, Param, Post, Body, Delete, UseGuards } from "@nestjs/common";

import { CommentsService } from "./comments.service";
import { IComment } from "../../model/orm/interfaces/comment.interface";
import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { CommentsGetallbyarticleDTO } from "./dto/comments.getallbyarticle.dto";
import { CommentUpdateDTO } from "./dto/comment.update.dto";

@Controller('api/admin/comments')
export class CommentsController {
    constructor (private commentsService: CommentsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("allbyarticle")
    public allByArticle(@Body() dto: CommentsGetallbyarticleDTO): Promise<IAnswer<IComment[]>> {
        return this.commentsService.allByArticle(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.commentsService.delete(_id);
    }  
    
    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: CommentUpdateDTO): Promise<IAnswer<void>> {
        return this.commentsService.update(dto);
    }
}
