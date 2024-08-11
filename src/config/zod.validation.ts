import { z } from 'zod';

export const ZodEnvsValidationSchema = z.object({
  NODE_ENV: z.string().default('dev'),
  STAGE: z.string().default('dev'),

  PORT: z.string().refine(
    (data) => {
      const reg = new RegExp('^[0-9]*$');
      if (reg.test(data)) {
        return true;
      }
    },
    {
      message: 'PORT must be a number',
    },
  ),
  JWT_SECRET: z.string(),

  // DB
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
});
