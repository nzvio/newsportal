import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { SettingSchema } from "../../model/orm/schemas/setting.schema";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Setting', schema: SettingSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [SettingsController],
    providers: [SettingsService],    
})
export class SettingsModule {}
