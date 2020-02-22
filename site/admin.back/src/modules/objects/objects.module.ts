import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsergroupSchema } from "../usergroups/schemas/usergroup.schema";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [
		MongooseModule.forFeature([
			{ name: 'Usergroup', schema: UsergroupSchema },			
		]),	
		JwtModule.register(jwtConstants),			
	],
})
export class ObjectsModule {}
