import { Controller, Post, Body } from "@nestjs/common";

import { ArticlesService } from "./articles.service";
import { IAnswer } from "../../interfaces/answer.interface";
import { ArticlesGetchunkDTO } from "./dto/articles.getchunk.dto";
import { ArticleDTO } from "./dto/article.dto";

@Controller('api/visitor/articles')
export class ArticlesController {
    constructor (private articlesService: ArticlesService) {}    

    // get top
    @Post("top")
    public chunk(@Body() dto: ArticlesGetchunkDTO): Promise<IAnswer<ArticleDTO[]>> {
        return this.articlesService.top(dto);
    }    
}
