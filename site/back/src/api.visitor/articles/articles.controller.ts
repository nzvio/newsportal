import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ArticlesService } from "./articles.service";
import { IAnswer } from "../../model/answer.interface";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";
import { ArticleDTO } from "./dto/article.dto";
import { IArticle } from "../../model/orm/interfaces/article.interface";
import { IVoteDTO } from "./dto/vote.dto";
import { IVoteAnswerDTO } from "./dto/vote.answer.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('api/visitor/articles')
export class ArticlesController {
    constructor (private articlesService: ArticlesService) {}    

    // get top articles
    @Post("top")
    public top(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        return this.articlesService.top(dto);
    }    

    // get main articles
    @Post("main")
    public main(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        return this.articlesService.main(dto);
    }

    // get popular articles
    @Post("popular")
    public popular(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        return this.articlesService.popular(dto);
    }

    // get recommended articles
    @Post("recommended")
    public recommended(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<IArticle[]>> {
        return this.articlesService.recommended(dto);
    }

    // get fragment
    @Post("chunk")
    public chunk(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        return this.articlesService.chunk(dto);
    }

    // get fragment from category
    @Post("chunkby")
    public chunkByCategory(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        return this.articlesService.chunkBy(dto);
    }

    // vote
    @UseGuards(AuthGuard)
    @Post("vote")    
    public vote(@Body() dto: IVoteDTO): Promise<IAnswer<IVoteAnswerDTO>> {
        return this.articlesService.vote(dto);
    }
}
