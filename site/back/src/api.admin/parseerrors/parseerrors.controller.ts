import { Controller, Post, Body, UseGuards, Delete, Param } from "@nestjs/common";

import { ParseerrorsService } from "./parseerrors.service";
import { IParseerror } from "../../model/orm/interfaces/parseerror.interface";
import { IAnswer } from "../../model/answer.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('api/admin/parseerrors')
export class ParseerrorsController {
    constructor (private parseerrorsService: ParseerrorsService) {}    

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<IParseerror[]>> {
        return this.parseerrorsService.chunk(dto);
    }    

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.parseerrorsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.parseerrorsService.deleteBulk(_ids);
    }
}
