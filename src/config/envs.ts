import 'dotenv/config';
import { ZodEnvsValidationSchema } from './zod.validation';

// validate envs: not safe 'cause we need to block start if envs are wrong
const validationResult = ZodEnvsValidationSchema.parse(process.env);

export const envs = {
  PORT: +validationResult.PORT,

  // DB
  DB_HOST: validationResult.DB_HOST,
  DB_PORT: validationResult.DB_PORT,
  DB_NAME: validationResult.DB_NAME,
  DB_USERNAME: validationResult.DB_USERNAME,
  DB_PASSWORD: validationResult.DB_PASSWORD,

  // STAGE
  STAGE: validationResult.STAGE,
};
