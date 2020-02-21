import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsergroupsModule } from './modules/usergroups/usergroups.module';
import { ObjectsModule } from './modules/objects/objects.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://root:6vl1TfeXq@localhost:27017/newsportal?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}),
		
		AuthModule,
		ObjectsModule,
		UsergroupsModule,
		UsersModule,
	],	
})
export class AppModule {}
