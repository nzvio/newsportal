import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { DonorSchema } from "./schemas/donor.schema";
import { DonorsService } from "./donors.service";
import { DonorsController } from "./donors.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Donor', schema: DonorSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [DonorsController],
    providers: [DonorsService],
    exports: [DonorsService],
})
export class DonorsModule {}
