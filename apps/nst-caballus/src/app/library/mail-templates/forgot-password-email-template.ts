import { EmailTemplate } from '@rfx/nst-mailer';
import { environment } from '@nst-caballus/env';

const HTTP_PORT = 80;

export class ForgotPasswordEmailTemplate extends EmailTemplate {
    public fileDestination: string = `${__dirname}/assets/email`;
    public fileName: string = 'forgot-password.html';
    public subject: string = 'Forgot Password';

    constructor(token: string) {
        super();

        const url = `${environment.ngxBaseUrl}/auth/reset?token=${token}`;

        this.addSubstitution('url', url);
    }
}
