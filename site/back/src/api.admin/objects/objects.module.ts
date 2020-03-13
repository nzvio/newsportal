import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsergroupSchema } from "../../model/orm/schemas/usergroup.schema";
import { UserSchema } from "../../model/orm/schemas/user.schema";
import { LangSchema } from "../../model/orm/schemas/lang.schema";
import { PageSchema } from "../../model/orm/schemas/page.schema";
import { CategorySchema } from "../../model/orm/schemas/category.schema";
import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { DonorSchema } from "../../model/orm/schemas/donor.schema";
import { TargetSchema } from "../../model/orm/schemas/target.schema";
import { CommentSchema } from "../../model/orm/schemas/comment.schema";
import { TagSchema } from "../../model/orm/schemas/tag.schema";
import { SettingSchema } from "../../model/orm/schemas/setting.schema";

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
			{name: 'Article', schema: ArticleSchema},
			{name: 'Donor', schema: DonorSchema},
			{name: 'Target', schema: TargetSchema},
			{name: 'Comment', schema: CommentSchema},
			{name: 'Tag', schema: TagSchema},
			{name: 'Setting', schema: SettingSchema},
		]),	
		JwtModule.register(jwtConstants),			
	],
})
export class ObjectsModule {}
