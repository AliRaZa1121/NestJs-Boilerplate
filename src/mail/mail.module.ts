import { Global, Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailConfiguration } from "../config/providers/mail.provider";

@Global() // 👈 global module
@Module({
  imports: [MailConfiguration],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
