import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PageSchema } from "../../schemas/page.schema";
import { PagesController } from "./pages.controller";
import { PagesService } from "./pages.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Page', schema: PageSchema}]),                
    ],
    controllers: [PagesController],
    providers: [PagesService],    
})
export class PagesModule {}
