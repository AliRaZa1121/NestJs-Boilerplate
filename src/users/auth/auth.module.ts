import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { MailModule } from "src/mail/mail.module";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshTokensRepository } from "./repository/refresh-token.repository";
import { PassportConfig, JwtConfig } from "src/config/providers/jwt.provider";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokensRepository]),
    JwtConfig,
    PassportConfig,
    PassportModule,
    ConfigModule,
    MailModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
