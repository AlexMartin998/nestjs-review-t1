import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfiguration } from './config/app.config';
import { ZodEnvsValidationSchema } from './config/zod.validation';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], // envs validations
      validate: ZodEnvsValidationSchema.parse,

      // // Con esto evitamos tener q importar el 'ConfigModule' en c/module q utilize EnvV
      isGlobal: true,
    }),

    // // DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      autoLoadEntities: process.env.STAGE === 'dev' ? true : false, // crea las tablas en la DB  en auto - prod: false
      synchronize: process.env.STAGE === 'dev' ? true : false, // solo en Dev - actua ante un cambio en las entities - prod: false
      logging: process.env.STAGE === 'dev' ? true : false, // solo en Dev - loguea las querys - prod: false
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
