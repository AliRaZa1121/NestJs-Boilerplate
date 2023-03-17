import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { UserExistsRule } from './decorators/custom-validator';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  DatabaseModule,
  UsersModule,
  AuthModule,
  MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
