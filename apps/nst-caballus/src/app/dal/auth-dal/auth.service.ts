import {
    Injectable,
    InternalServerErrorException,
    BadRequestException
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { compareHash, hash } from '@rfx/njs-security';
import { LoginType, JwtPayload, JwtTokenType, User, JwtRefreshPayload } from '@caballus/api-common';
import { TokenService } from '@rfx/nst-permissions';
import { MailerService } from '@rfx/nst-mailer';
import { ForgotPasswordEmailTemplate, PasswordResetNotifyEmailTemplate } from '@nst-caballus/library';
import { ObjectId } from '@rfx/njs-db/mongo';
import { environment } from '@nst-caballus/env';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './token.repository';
import { addSeconds } from 'date-fns';

@Injectable()
export class AuthService {
    constructor(
        private readonly _authRepo: AuthRepository,
        private readonly _tokenRepo: TokenRepository,
        private readonly _tokenService: TokenService,
        private readonly _mailerService: MailerService
    ) {}

    /**
     * Login with an email and password, uses the LoginType.Web type login if
     * available and fails if an instance of the web login type doesn't exist
     * on the user.
     *
     * @param email
     * @param password
     * @returns A JWT that expires in whatever time is set in app.module.ts
     */
    public async login(email: string, password: string): Promise<{ token: string; refresh: string }> {
        const user = await this._authRepo.getUserByEmail(email);
        const login = user && user.logins.find(x => x.type === LoginType.Web);
        if (!(user && login && (await compareHash(password, login.key)))) {
            throw new BadRequestException('Wrong email/password combination');
        }
        const token = await this.createAccessToken(user._id, user);
        const refresh = await this.createRefreshToken(user._id, user._id);
        return { token, refresh };
    }

    public async createAccessToken(
        userId: ObjectId,
        user: User = null,
        absoluteUserId?: ObjectId
    ): Promise<string> {
        if (!user) {
            user = await this._authRepo.getUserById(userId);
        }
        const userIdHex = user._id.toHexString();
        const absoluteUserIdHex = !!absoluteUserId ? absoluteUserId.toHexString() : null;
        const authTokenPayload = new JwtPayload(
            userIdHex,
            JwtTokenType.Standard,
            absoluteUserIdHex
        );
        return this._tokenService.createToken(authTokenPayload);
    }

    private async createRefreshToken(
        userId: ObjectId,
        absoluteUserId: ObjectId
    ): Promise<string> {
        const refreshExpireDate: Date = addSeconds(
            new Date(),
            environment.refreshTokenExpireLength
        );
        const refreshTokenId = await this._tokenRepo.createToken(userId, refreshExpireDate, absoluteUserId);
        const refreshPayload = new JwtRefreshPayload(
            refreshTokenId.toHexString(),
            userId.toHexString(),
            JwtTokenType.Refresh,
            !!absoluteUserId ? absoluteUserId.toHexString() : null
        );
        return this._tokenService.createToken(refreshPayload, environment.refreshTokenExpireLength);
    }

    public async isValidRefreshToken(
        refreshTokenId: ObjectId,
        userId: ObjectId,
        absoluteUserId?: ObjectId
    ): Promise<boolean> {
        return this._tokenRepo.isTokenActive(refreshTokenId, userId, absoluteUserId);
    }

    public async getJwtPayloadFromHeader(authHeader: string): Promise<JwtPayload> {
        return new JwtService({}).decode(authHeader.replace('Bearer ', '')) as JwtPayload;
    }

    public async createImpersonationTokens(
        absoluteUser: User,
        targetUser: User
    ): Promise<{ token: string, refresh: string}> {
        const payload = new JwtPayload(
            targetUser._id.toHexString(),
            JwtTokenType.Standard,
            absoluteUser._id.toHexString()
        );
        const token = await this._tokenService.createToken(payload);
        const refresh = await this.createRefreshToken(
            targetUser._id,
            absoluteUser._id
        );
        return { token, refresh };
    }

    public async impersonationStopTokens(
        absoluteUser: User
    ): Promise<{ token: string; refresh: string }> {
        const token = await this.createAccessToken(absoluteUser._id, absoluteUser);
        const refresh = await this.createRefreshToken(absoluteUser._id, absoluteUser._id);
        return { token, refresh };
    }


    /**
     * Sends an email to the user given by email with a link that contains a
     * temporary token that gives them permission only to change password.
     *
     * This function does nothing and throws no errors if the user does not
     * exist.
     *
     * @param email
     */
    public async forgotPassword(email: string): Promise<void> {
        const user = await this._authRepo.getUserByEmail(email);
        if (!user || !user.logins.find(x => x.type === LoginType.Web)) {
            return;
        }

        // Create token that gives permission only to reset password for 30m
        const payload = new JwtPayload(user._id.toHexString(), JwtTokenType.PasswordReset);
        const expSeconds = 1800; // 30 minutes
        const token = await this._tokenService.createToken(payload, expSeconds);

        // Email user
        const mail = new ForgotPasswordEmailTemplate(token);
        mail.addTo(email, user.profile.firstName + ' ' + user.profile.lastName);
        try {
            await this._mailerService.send(mail);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    /**
     * Sets the password for the given user and notifies them via email.
     *
     * @param userId
     * @param password
     */
    public async resetPassword(email: string, password: string): Promise<void> {
        const newPasswordHash = await hash(password);
        await this._authRepo.updatePasswordHash(email, newPasswordHash);

        const mail = new PasswordResetNotifyEmailTemplate();
        mail.addTo(email);
        try {
            await this._mailerService.send(mail);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
