import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsergroupSchema } from "../usergroups/schemas/usergroup.schema";
import { UserSchema } from "../users/schemas/user.schema";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [
		MongooseModule.forFeature([
			{name: 'Usergroup', schema: UsergroupSchema},
			{name: 'User', schema: UserSchema},
		]),	
		JwtModule.register(jwtConstants),			
	],
})
export class ObjectsModule {}
