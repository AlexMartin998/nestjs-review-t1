import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // logger
  const logger = new Logger('Bootstrap');
  // Get EnvV
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  // // set global prefix
  app.setGlobalPrefix('api');

  // // set global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remueve extra data of DTO - like Mongoose ODM
      forbidNonWhitelisted: true, // envia 1 error con las properties q NO estan definidas en DTO
    }),
  );

  await app.listen(PORT);
  logger.log(`App is running on port ${PORT}`);
}
bootstrap();
