import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigurationsModule } from './config/config.module';

@Module({
  imports: [
    ConfigurationsModule,
    MailModule,
    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
