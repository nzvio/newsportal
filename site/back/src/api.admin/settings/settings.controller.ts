import { Controller, Param, Post, Body, Delete, UseGuards } from "@nestjs/common";

import { SettingsService } from "./settings.service";
import { ISetting } from "../../model/orm/interfaces/setting.interface";
import { IAnswer } from "../../model/answer.interface";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { AuthGuard } from "../auth/auth.guard";
import { SettingCreateDTO } from "./dto/setting.create.dto";

@Controller('api/admin/settings')
export class SettingsController {
    constructor (private settingsService: SettingsService) {}
    
    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<ISetting[]>> {
        return this.settingsService.chunk(dto);
    }
    
    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.settingsService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.settingsService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: SettingCreateDTO): Promise<IAnswer<void>> {
        return this.settingsService.create(dto);
    }    
}
