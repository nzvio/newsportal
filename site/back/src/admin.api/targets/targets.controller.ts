import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { TargetsService } from "./targets.service";
import { ITarget } from "../../interfaces/model/target.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";
import { TargetCreateDTO } from "./dto/target.create.dto";
import { TargetUpdateDTO } from "./dto/target.update.dto";

@Controller('api/admin/targets')
export class TargetsController {
    constructor (private targetsService: TargetsService) {}    

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<ITarget[]>> {
        return this.targetsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<ITarget>> {
        return this.targetsService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.targetsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.targetsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: TargetCreateDTO): Promise<IAnswer<void>> {
        return this.targetsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: TargetUpdateDTO): Promise<IAnswer<void>> {
        return this.targetsService.update(dto);
    }
}
