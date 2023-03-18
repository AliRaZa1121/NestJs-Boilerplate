import { Global, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { RolesRepository } from "../roles/roles.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { MailModule } from "src/mail/mail.module";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RolesRepository, UsersRepository]),
    MailModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule.forFeature([UsersRepository])],
})
export class UsersModule {}
