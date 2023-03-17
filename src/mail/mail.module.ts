import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { appEnv } from '../helpers/env.helper';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: appEnv('MAIL_HOST', 'smtp.mailtrap.io'),
        secure: false,
        auth: {
          user: appEnv('MAIL_USER', '6fb9e1039fe0d7'),
          pass: appEnv('MAIL_PASSWORD', 'e2bb9bf5f803ad'),
        },
      },
      defaults: {
        from: appEnv('MAIL_FROM', 'info@inhomepage.com'),
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule { }
