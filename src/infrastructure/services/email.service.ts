import { injectable } from 'tsyringe';
import envConfig from '../../shared/config';
import logger from '../../shared/utils/logger';
import { IEmailService } from '../../domain/serviceInterfaces/email-service.interface';
import nodemailer from 'nodemailer';

@injectable()
export class EmailService implements IEmailService {
  private _transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envConfig.nodemailer.EMAIL_USER,
        pass: envConfig.nodemailer.EMAIL_PASS
      }
    });
  }

  private async _sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments?: { filename: string; content: Buffer; cid: string }[];
  }): Promise<void> {
    const info = await this._transporter.sendMail(mailOptions);
    logger.log(`📧 Email sent:` + info.response);
  }

  async sendInvitationMail(mailOptions: {
    to: string;
    subject: string;
    html: string;
    qrBase64: string;
  }): Promise<void> {
    const attachments = mailOptions.qrBase64
      ? [
          {
            filename: 'qrcode.png',
            content: Buffer.from(mailOptions.qrBase64, 'base64'),
            cid: 'qrcode'
          }
        ]
      : undefined;

    await this._sendMail({
      from: `"Festivo" <${envConfig.nodemailer.EMAIL_USER}>`,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
      attachments
    });
  }
}
