import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { MailerModule, MailerService } from '@rfx/nst-mailer';
import { TokenRepository } from './token.repository';

@Module({
    imports: [MailerModule, MailerService],
    providers: [AuthService, AuthRepository, TokenRepository],
    exports: [AuthService]
})
export class AuthDalModule {}
