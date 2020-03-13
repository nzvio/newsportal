import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { ArticlesService } from "./articles.service";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { ArticleCreateDTO } from "./dto/article.create.dto";
import { ArticleUpdateDTO } from "./dto/article.update.dto";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";

@Controller('api/admin/articles')
export class ArticlesController {
    constructor (private articlesService: ArticlesService) {}    

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        return this.articlesService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<IArticle>> {
        return this.articlesService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.articlesService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.articlesService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: ArticleCreateDTO): Promise<IAnswer<void>> {
        return this.articlesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: ArticleUpdateDTO): Promise<IAnswer<void>> {
        return this.articlesService.update(dto);
    }
}
