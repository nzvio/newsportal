import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { DonorsService } from "./donors.service";
import { IDonor } from "./interfaces/donor.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { GetallDTO } from "../../dto/getall.dto";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";
import { DonorCreateDTO } from "./dto/donor.create.dto";
import { DonorUpdateDTO } from "./dto/donor.update.dto";

@Controller('api/admin/donors')
export class DonorsController {
    constructor (private donorsService: DonorsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<IDonor[]>> {
        return this.donorsService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<IDonor[]>> {
        return this.donorsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<IDonor>> {
        return this.donorsService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.donorsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.donorsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: DonorCreateDTO): Promise<IAnswer<void>> {
        return this.donorsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: DonorUpdateDTO): Promise<IAnswer<void>> {
        return this.donorsService.update(dto);
    }
}
