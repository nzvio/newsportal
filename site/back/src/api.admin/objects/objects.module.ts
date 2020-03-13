import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsergroupSchema } from "../../schemas/usergroup.schema";
import { UserSchema } from "../../schemas/user.schema";
import { LangSchema } from "../../schemas/lang.schema";
import { PageSchema } from "../../schemas/page.schema";
import { CategorySchema } from "../../schemas/category.schema";
import { ArticleSchema } from "../../schemas/article.schema";
import { DonorSchema } from "../../schemas/donor.schema";
import { TargetSchema } from "../../schemas/target.schema";
import { CommentSchema } from "../../schemas/comment.schema";
import { TagSchema } from "../../schemas/tag.schema";

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
		]),	
		JwtModule.register(jwtConstants),			
	],
})
export class ObjectsModule {}
