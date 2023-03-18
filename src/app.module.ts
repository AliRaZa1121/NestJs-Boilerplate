import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MediaModule } from "./media/media.module";
import { JwtStrategy } from "./users/auth/jwt/jwt.strategy";
import { AuthModule } from "./users/auth/auth.module";
import { ConfigurationsModule } from "./config/config.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigurationsModule,
    AuthModule,
    UsersModule,
    RolesModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule {}
