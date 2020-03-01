import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { TargetSchema } from "./schemas/target.schema";
import { TargetsService } from "./targets.service";
import { TargetsController } from "./targets.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Target', schema: TargetSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [TargetsController],
    providers: [TargetsService],
    exports: [TargetsService],
})
export class TargetsModule {}
