import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	const app = await NestFactory.create(AppModule);			
	app.enableCors({origin: ["https://sc.vio.net.ua", "https://admin.sc.vio.net.ua"]});
	app.use(bodyParser.json({limit: '50mb'}));	
	await app.listen(3018);
}

bootstrap();
