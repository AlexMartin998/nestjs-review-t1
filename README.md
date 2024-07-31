<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).




### DOCS:
-- Configurar las Environment Variables
  - Requiere algunas dependencies   ``
  - En el `app.module.ts`
    - En los   imports=[] colocamos el  `ConfigModule.forRoot()`, al principio
    - Las usamos con el  process.envi.NAME
  - Usaremos zod para las validaciones. Solo puede hacer un forRoot ne cafa poblacion



      https://docs.nestjs.com/techniques/database
-- Instalar dependencias para W con `DB` (PostgreSQL - TypeORM)
- Dependencias:   `pnpm add @nestjs/typeorm typeorm pg`
- En el `app.module.ts`
  - En los  imports=[]  colocamos el   `TypeOrmModule.forRoot({})`  con sus respectivas cnofiguracioens
  - Solo puede exister un  `.forRoot()`   para cualquier module, el resto son   `.forFeature()`






  <!-- /* ================================================================ -->
  ### Documentar con OpenAPI
  -- Documentacion - OpenAPI: https://docs.nestjs.com/openapi/introduction
    - Instalamos dependencias:    `pnpm add @nestjs/swagger`

    - OpenAPI es el Standar, Swagger es la implementacion
      - Configuramos en el      `main.ts`
        - Crea el cascaron vacio de la doc en  /api
  ```js
    // // docs    <---   main.ts
    const config = new DocumentBuilder()
      .setTitle('Teslo example')
      .setDescription('Tesloshop REST API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // endpoint  /api
  ```

    - Debemos empezar a definir como luce cada enpoint/dto para la doc
      - @ApiTags('Products'): Separar x tags  en el Controller
        -  @ApiResponse({ status: 201, description: 'Product was created' , type: Product})
      - @ApiProperty({})  en la Entity/DTO

    - -- Tengo mi propio decorador





