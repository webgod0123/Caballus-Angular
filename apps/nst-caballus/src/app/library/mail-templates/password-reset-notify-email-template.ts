import { EmailTemplate } from '@rfx/njs-mailer';

export class PasswordResetNotifyEmailTemplate extends EmailTemplate {
    public fileDestination: string = `${__dirname}/assets/email`;
    public fileName: string = 'password-reset.html';
    public subject: string = 'Your Password Has Been Reset!';
}
