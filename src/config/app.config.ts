export const EnvConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  STAGE: process.env.STAGE || 'dev',

  PORT: +process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
});
