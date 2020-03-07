import { Controller, UseGuards, Post, Body, Get, Param, Delete } from "@nestjs/common";

import { LangsService } from "./langs.service";
import { AuthGuard } from "../auth/auth.guard";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { ILang } from "../../interfaces/model/lang.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { LangCreateDTO } from "./dto/lang.create.dto";
import { LangUpdateDTO } from "./dto/lang.update.dto";

@Controller('api/admin/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<ILang[]>> {
        return this.langsService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<ILang[]>> {
        return this.langsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<ILang>> {
        return this.langsService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.langsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.langsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: LangCreateDTO): Promise<IAnswer<void>> {
        return this.langsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: LangUpdateDTO): Promise<IAnswer<void>> {
        return this.langsService.update(dto);
    }
}
