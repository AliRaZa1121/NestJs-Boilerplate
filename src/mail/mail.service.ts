import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailNotification(emailData, template) {
    try {
      const subject = emailData.hasOwnProperty('subject')
        ? emailData.subject
        : `Email form ${process.env.APP_NAME}`;
      await this.mailerService.sendMail({
        to: emailData.email,
        subject: subject,
        template: `./${template}.hbs`,
        context: emailData,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
