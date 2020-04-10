import { Controller, UseGuards, Get } from "@nestjs/common";

import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { StatService } from "./stat.service";
import { IApcDTO } from "./dto/apc.dto";

@Controller('api/admin/stat')
export class StatController {
    constructor (private statService: StatService) {}    
    
    // articles quantity per month
    @UseGuards(AuthGuard)
    @Get("articlespermonth")
    public articlesPerMonth(): Promise<IAnswer<number[]>> {
        return this.statService.articlesPerMonth();
    }
    
    // articles quantity per day
    @UseGuards(AuthGuard)
    @Get("articlesperday")
    public articlesPerDay(): Promise<IAnswer<number[]>> {
        return this.statService.articlesPerDay();
    }

    // articles quantity per category
    @UseGuards(AuthGuard)
    @Get("articlespercategory")
    public articlesPerCategory(): Promise<IAnswer<IApcDTO[]>> {
        return this.statService.articlesPerCategory();
    }
}
