import { Controller, UseGuards, Get } from "@nestjs/common";

import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { StatService } from "./stat.service";

@Controller('api/admin/stat')
export class StatController {
    constructor (private statService: StatService) {}    
    
    // articles quantity per month
    @UseGuards(AuthGuard)
    @Get("articlespermonth")
    public articlesPerMonth(): Promise<IAnswer<number[]>> {
        return this.statService.articlesPerMonth();
    } 
}
