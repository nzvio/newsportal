import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsergroupSchema } from "../usergroups/schemas/usergroup.schema";
import { UserSchema } from "../users/schemas/user.schema";
import { LangSchema } from "../langs/schemas/lang.schema";
import { PageSchema } from "../pages/schemas/page.schema";
import { CategorySchema } from "../categories/schemas/category.schema";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [
		MongooseModule.forFeature([
			{name: 'Usergroup', schema: UsergroupSchema},
			{name: 'User', schema: UserSchema},
			{name: 'Lang', schema: LangSchema},
			{name: 'Page', schema: PageSchema},
			{name: 'Category', schema: CategorySchema},
		]),	
		JwtModule.register(jwtConstants),			
	],
})
export class ObjectsModule {}
