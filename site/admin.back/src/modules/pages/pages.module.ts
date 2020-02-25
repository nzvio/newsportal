import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { PageSchema } from "./schemas/page.schema";
import { jwtConstants } from "../auth/auth.constants";
import { PagesController } from "./pages.controller";
import { PagesService } from "./pages.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Page', schema: PageSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [PagesController],
    providers: [PagesService],    
})
export class PagesModule {}
