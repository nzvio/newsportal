import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsergroupsModule } from './modules/usergroups/usergroups.module';
import { ObjectsModule } from './modules/objects/objects.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { LangsModule } from './modules/langs/langs.module';
import { PagesModule } from './modules/pages/pages.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { DonorsModule } from './modules/donors/donors.module';

const pw: string = process.env.MONGODBPW;

@Module({
	imports: [
		MongooseModule.forRoot(`mongodb://root:${pw}@localhost:27017/newsportal?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),
		
		AuthModule,
		ObjectsModule,
		FilesModule,
		UsergroupsModule,
		UsersModule,
		LangsModule,		
		PagesModule,
		CategoriesModule,
		ArticlesModule,
		DonorsModule,
	],	
})
export class AppModule {}
