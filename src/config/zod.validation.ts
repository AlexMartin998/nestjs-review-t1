import { z } from 'zod';

export const ZodEnvsValidationSchema = z.object({
  NODE_ENV: z.string().default('dev'),
  STAGE: z.string().default('dev'),

  PORT: z
    .string()
    .default('3333')
    .refine(
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
});
