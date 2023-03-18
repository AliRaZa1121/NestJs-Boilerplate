import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const MailConfiguration = MailerModule.forRootAsync({
  imports: [ConfigModule], // import module if not enabled globally
  useFactory: async (config: ConfigService) => ({
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT, // 465 and 25 is not working
      secure: Boolean(process.env.MAIL_SECURE),
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: `"No Reply" <${process.env.MAIL_FROM}>`,
    },
    template: {
      dir: join(__dirname, "templates"),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
});
