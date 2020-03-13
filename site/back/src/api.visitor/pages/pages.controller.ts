import { Controller, Post, Body } from "@nestjs/common";

import { PagesService } from "./pages.service";
import { GetallDTO } from "../../model/dto/getall.dto";
import { IAnswer } from "../../model/answer.interface";
import { PageDTO } from "./dto/page.dto";

@Controller('api/visitor/pages')
export class PagesController {
    constructor (private pagesService: PagesService) {}

    // get all    
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<PageDTO[]>> {
        return this.pagesService.all(dto);
    }    
}
