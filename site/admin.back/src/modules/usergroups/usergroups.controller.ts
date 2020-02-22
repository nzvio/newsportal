import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { UsergroupsService } from "./usergroups.service";
import { IUsergroup } from "./interfaces/usergroup.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { UsergroupGetallDTO } from "./dto/usergroup.getall.dto";
import { UsergroupGetchunkDTO } from "./dto/usergroup.getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";
import { UsergroupCreateDTO } from "./dto/usergroup.create.dto";
import { UsergroupUpdateDTO } from "./dto/usergroup.update.dto";

@Controller('api/admin/usergroups')
export class UsergroupsController {
    constructor (private usergroupsService: UsergroupsService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: UsergroupGetallDTO): Promise<IAnswer<IUsergroup[]>> {
        return this.usergroupsService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: UsergroupGetchunkDTO): Promise<IAnswer<IUsergroup[]>> {
        return this.usergroupsService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<IUsergroup>> {
        return this.usergroupsService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.usergroupsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.usergroupsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: UsergroupCreateDTO): Promise<IAnswer<void>> {
        return this.usergroupsService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: UsergroupUpdateDTO): Promise<IAnswer<void>> {
        return this.usergroupsService.update(dto);
    }
}
