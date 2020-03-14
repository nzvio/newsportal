import { Controller, Get } from "@nestjs/common";

import { SettingsService } from "./settings.service";
import { IAnswer } from "../../model/answer.interface";
import { ISetting } from "../../model/orm/interfaces/setting.interface";

@Controller('api/visitor/settings')
export class SettingsController {
    constructor (private settingsService: SettingsService) {}

    // get all
    @Get("all")
    public all(): Promise<IAnswer<ISetting[]>> {
        return this.settingsService.all();
    }
}
