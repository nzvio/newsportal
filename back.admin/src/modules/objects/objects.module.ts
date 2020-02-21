import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { UsergroupSchema } from "../usergroups/schemas/usergroup.schema";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [
		MongooseModule.forFeature([
			{ name: 'Usergroup', schema: UsergroupSchema },			
		]),				
	],
})
export class ObjectsModule {}
