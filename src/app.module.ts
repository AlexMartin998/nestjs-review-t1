import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
