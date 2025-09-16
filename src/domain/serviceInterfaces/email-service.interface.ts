export interface IEmailService {
  sendInvitationMail(mailOptions: {
    to: string;
    subject: string;
    html: string;
    qrBase64: string;
  }): Promise<void>;
}
