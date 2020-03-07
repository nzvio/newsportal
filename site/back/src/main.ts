import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);			
	app.enableCors({origin: ["https://sc.vio.net.ua", "https://admin.sc.vio.net.ua"]});
	await app.listen(3018);
}

bootstrap();
