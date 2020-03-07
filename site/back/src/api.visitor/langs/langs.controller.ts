import { Controller, Post, Body } from "@nestjs/common";

import { LangsService } from "./langs.service";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { ILang } from "../../interfaces/model/lang.interface";

@Controller('api/visitor/langs')
export class LangsController {
    constructor (private langsService: LangsService) {}

    // get all
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<ILang[]>> {
        return this.langsService.all(dto);
    }
}
