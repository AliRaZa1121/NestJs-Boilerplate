export const MAIL_ENV = {
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_FROM: process.env.MAIL_FROM,
  COPYRIGHT_YEAR: process.env.COPYRIGHT_YEAR,
  MAIL_TRANSPORT: `smtp://${process.env.MAIL_USER}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
};
