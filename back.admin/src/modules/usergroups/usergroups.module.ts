import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsergroupSchema } from "./schemas/usergroup.schema";
import { UsergroupsService } from "./usergroups.service";
import { UsergroupsController } from "./usergroups.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Usergroup', schema: UsergroupSchema}])],
    controllers: [UsergroupsController],
    providers: [UsergroupsService],
})
export class UsergroupsModule {}
