import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { TagsService } from "./tags.service";
import { ITag } from "../../model/orm/interfaces/tag.interface";
import { IAnswer } from "../../model/answer.interface";
import { GetallDTO } from "../../model/dto/getall.dto";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";
import { TagCreateDTO } from "./dto/tag.create.dto";
import { TagUpdateDTO } from "./dto/tag.update.dto";

@Controller('api/admin/tags')
export class TagsController {
    constructor (private tagsService: TagsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<ITag[]>> {
        return this.tagsService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<ITag[]>> {
        return this.tagsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<ITag>> {
        return this.tagsService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.tagsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.tagsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: TagCreateDTO): Promise<IAnswer<void>> {
        return this.tagsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: TagUpdateDTO): Promise<IAnswer<void>> {
        return this.tagsService.update(dto);
    }
}
