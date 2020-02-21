import { Controller, Get, Param, Post, Body, Delete } from "@nestjs/common";

import { UsergroupsService } from "./usergroups.service";
import { IUsergroup } from "./interfaces/usergroup.interface";
import { IAnswer } from "../../interfaces/answer.interface";
import { UsergroupGetallDTO } from "./dto/usergroup.getall.dto";
import { UsergroupGetchunkDTO } from "./dto/usergroup.getchunk.dto";

@Controller('api/admin/usergroups')
export class UsergroupsController {
    constructor (private usergroupsService: UsergroupsService) {}

    // get all
    @Post("all")
    public all(@Body() dto: UsergroupGetallDTO): Promise<IAnswer<IUsergroup[]>> {
        return this.usergroupsService.all(dto);
    }

    // get fragment
    @Post("chunk")
    public chunk(@Body() dto: UsergroupGetchunkDTO): Promise<IAnswer<IUsergroup[]>> {
        return this.usergroupsService.chunk(dto);
    }

    // delete one
    @Delete("delete/:_id")
    public delete (@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.usergroupsService.delete(_id);
    }

    // delete many
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.usergroupsService.deleteBulk(_ids);
    }
}
