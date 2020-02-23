import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { UsergroupSchema } from "./schemas/usergroup.schema";
import { UsergroupsService } from "./usergroups.service";
import { UsergroupsController } from "./usergroups.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Usergroup', schema: UsergroupSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [UsergroupsController],
    providers: [UsergroupsService],
    exports: [UsergroupsService],
})
export class UsergroupsModule {}
