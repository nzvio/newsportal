import { Controller, Post, Body } from "@nestjs/common";

import { TagsService } from "./tags.service";
import { IAnswer } from "../../model/answer.interface";
import { ITag } from "../../model/orm/interfaces/tag.interface";
import { TagsGetallDTO } from "./dto/tags.getall.dto";

@Controller('api/visitor/tags')
export class TagsController {
    constructor (private tagsService: TagsService) {}

    // get all
    @Post("all")
    public all(@Body() dto: TagsGetallDTO): Promise<IAnswer<ITag[]>> {
        return this.tagsService.all(dto);
    }
}
