import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { envs } from './config/envs';

@Module({
  imports: [
    // // DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: +envs.DB_PORT,
      database: envs.DB_NAME,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,

      autoLoadEntities: envs.STAGE === 'dev' ? true : false, // crea las tablas en la DB  en auto - prod: false
      synchronize: envs.STAGE === 'dev' ? true : false, // solo en Dev - actua ante un cambio en las entities - prod: false
      logging: envs.STAGE === 'dev' ? true : false, // solo en Dev - loguea las querys - prod: false
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
