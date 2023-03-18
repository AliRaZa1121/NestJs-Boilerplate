import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "src/users/entities/user.entity";
import { ResetPasswordDataDto } from "src/users/dto/authentications.dto";
import { sendError } from "src/helpers/error-handling.helper";
import { ErrorApiInterface } from "../utilities/responses/wrapper.response";
import { MAIL_ENV } from "src/utilities/const";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendUserInvitation(
    user: User,
    password: string
  ): Promise<boolean | ErrorApiInterface> {
    try {
      const mailSent = await this.mailerService.sendMail({
        to: user.email,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Registration Successfully`,
        template: "user-invitation", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          email: user.email,
          password: password,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });

      return mailSent;
    } catch (error) {
      return sendError(error);
    }
  }

  async sendMailHR(data: any) {
    try {
      const first_name = data?.to_user?.split("@")[0];
      await this.mailerService.sendMail({
        to: data?.to_user,
        cc: data?.cc,
        bcc: data?.bcc,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - ${data.subject}`,
        template: "hr-mail", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          first_name: first_name,
          body: data?.body,
          attachments: data?.files,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      return sendError(error);
    }
  }

  async SendMailToOrganization(data: {
    first_name?: any;
    body?: any;
    to_user?: any;
    subject?: any;
  }) {
    try {
      const { first_name, body } = data;
      await this.mailerService.sendMail({
        to: data?.to_user,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - ${data.subject}`,
        template: "referral-mail", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          first_name: first_name,
          body: body,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
      return true;
    } catch (error) {
      return sendError(error);
    }
  }

  async sendResetPasswordEmail(
    resetPasswordDataDto: ResetPasswordDataDto,
    user_row: { id: any; register_hash: any }
  ) {
    try {
      await this.mailerService.sendMail({
        to: resetPasswordDataDto.data.email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Reset Your Password`,
        template: "reset-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
          reset_password_link: `${
            this.configService.get("APP_URL") || process.env.APP_URL
          }/reset/${user_row.id}/${user_row.register_hash}`,
        },
      });
    } catch (error) {
      return sendError(error);
    }
  }

  async sendForgetPasswordEmail(
    email: any,
    user_row: { user_id: number; token: string }
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Forget Password`,
        template: "reset-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
          reset_password_link: `${
            this.configService.get("APP_URL") || process.env.APP_URL
          }/reset/${user_row.user_id}/${user_row.token}`,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async confirmResetPasswordEmail(email: any) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Password Reset Confirmation`,
        template: "confirm-password", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      return sendError(error);
    }
  }

  async sendWarningNotification(data: {
    email: any;
    type: any;
    first_name: any;
  }) {
    try {
      await this.mailerService.sendMail({
        to: data?.email,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - ${data.type} Expiring`,
        template: "expiry-warning", // `.hbs` extension is appended automatically
        context: {
          type: data?.type,
          first_name: data?.first_name,
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      console.log(error.message);
      return sendError(error);
    }
  }

  async sendUserRegistrationEmail(user: { email: any; first_name: any }) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: MAIL_ENV.MAIL_FROM,
        subject: `${
          this.configService.get("APP_NAME") || process.env.APP_NAME
        } - Registration Complete`,
        template: "user-registration", // `.hbs` extension is appended automatically
        context: {
          app_name: this.configService.get("APP_NAME") || process.env.APP_NAME,
          app_url: this.configService.get("APP_URL") || process.env.APP_URL,
          first_name: user?.first_name,
          copyright_year: MAIL_ENV.COPYRIGHT_YEAR,
        },
      });
    } catch (error) {
      return sendError(error);
    }
  }
}
