import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminAPIModule } from './admin.api/admin.api.module';

const pw: string = process.env.MONGODBPW;

@Module({
	imports: [
		MongooseModule.forRoot(`mongodb://root:${pw}@localhost:27017/newsportal?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),		
		AdminAPIModule,		
	],	
})
export class AppModule {}
