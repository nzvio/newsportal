import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common";

import { SitemapService } from "./sitemap.service";
import { AuthGuard } from "../auth/auth.guard";
import { IAnswer } from "../../model/answer.interface";
import { ISitemapSaveDTO } from "./dto/sitemap.save.dto";

@Controller('api/admin/sitemap') 
export class SitemapController {
    constructor (private sitemapService: SitemapService) {}

    @Get("load")
    @UseGuards(AuthGuard)
    public load(): Promise<IAnswer<string>> {
        return this.sitemapService.load();
    }

    @Post("save")
    @UseGuards(AuthGuard)
    public save (@Body() dto: ISitemapSaveDTO): Promise<IAnswer<void>> {
        return this.sitemapService.save(dto.data);
    }

    @Get("build")
    @UseGuards(AuthGuard)
    public build(): Promise<IAnswer<string>> {
        return this.sitemapService.build();
    }
}
