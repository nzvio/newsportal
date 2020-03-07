import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminAPIModule } from './api.admin/admin.api.module';
import { VisitorAPIModule } from './api.visitor/visitor.api.module';

const pw: string = process.env.MONGODBPW;

@Module({
	imports: [
		MongooseModule.forRoot(`mongodb://root:${pw}@localhost:27017/newsportal?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),		
		AdminAPIModule,
		VisitorAPIModule,
	],	
})
export class AppModule {}
