import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { LangSchema } from "../../schemas/lang.schema";
import { LangsController } from "./langs.controller";
import { LangsService } from "./langs.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Lang', schema: LangSchema}]),        
    ],
    controllers: [LangsController],
    providers: [LangsService],    
})
export class LangsModule {}
