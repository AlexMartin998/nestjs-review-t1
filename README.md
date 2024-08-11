<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description
- -- El resto de doc es la misma de la rama `main`, solo cambian las envs xq ahora usan `dotenv`


### DOCS:
-- Configurar las `Environment Variables` -> `.env`   <--- Esta es la mas usada para REST, pero para Microservices complica un poco las cosas, asi q se usa otra forma
  - Para microservices por facilidad NO se usa el ConfigModule ni el `ConfigService` xq sino se tiene q cargar config serve async y cosas medias raras/complejas
  - ya NOOOOO Requiere algunas dependencies   `pnpm add @nestjs/config`

  - --- Enfoque en Microservices:
    - -- Creamos el   `envs.ts`    en el  /config   <--  creamos el .env tb
    - -- En el   `main.ts`   lo usamos y ya, sin configs especiales


