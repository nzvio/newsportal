import { Controller, UseGuards, Post, Body, Get, Param, Delete } from "@nestjs/common";

import { PagesService } from "./pages.service";
import { AuthGuard } from "../auth/auth.guard";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { IPage } from "../../interfaces/model/page.interface";
import { PageDTO } from "./dto/page.dto";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { PageCreateDTO } from "./dto/page.create.dto";
import { PageUpdateDTO } from "./dto/page.update.dto";

@Controller('api/admin/pages')
export class PagesController {
    constructor (private pagesService: PagesService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<PageDTO[]>> {
        return this.pagesService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<PageDTO[]>> {
        return this.pagesService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<IPage>> {
        return this.pagesService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.pagesService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.pagesService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: PageCreateDTO): Promise<IAnswer<void>> {
        return this.pagesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: PageUpdateDTO): Promise<IAnswer<void>> {
        return this.pagesService.update(dto);
    }
}
