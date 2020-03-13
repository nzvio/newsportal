import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { LangSchema } from "../../model/orm/schemas/lang.schema";
import { jwtConstants } from "../auth/auth.constants";
import { LangsController } from "./langs.controller";
import { LangsService } from "./langs.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Lang', schema: LangSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [LangsController],
    providers: [LangsService],    
})
export class LangsModule {}
