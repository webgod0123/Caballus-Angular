import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '@nst-caballus/env';
import { createObjectId } from '@rfx/njs-db/mongo';
import { UserService, RoleService } from '@nst-caballus/dal';
import { JwtPayload, User, JwtTokenType, Permission } from '@caballus/api-common';

const oneSecondMS = 1000;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.secretKey,
            ignoreExpiration: true
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        // Manually validate expiration date
        // Refresh tokens are checked against the database
        if (payload.tokenType !== JwtTokenType.Refresh) {
            const exp = payload.exp * oneSecondMS;
            const now = Date.now();
            if (exp < now) {
                // Return 401 Unauthorized when the token expires so that the
                // frontend can handle it appropriately
                throw new UnauthorizedException();
            }
        }
        const user = await this.userService.getUserById(createObjectId(payload.userId));
        if (!user || user.roleIds.length < 1) {
            throw new UnauthorizedException();
        }
        switch (payload.tokenType) {
            case JwtTokenType.PasswordReset:
                // User should only be able to reset their password with this
                // token
                user.permissions = [Permission.ResetPassword];
                break;
            case JwtTokenType.Standard:
            default:
                // Lookup roles via roleIds
                const roles = await this.roleService.getRolesByIdList(user.roleIds);
                user.permissions = [];
                for (const r of roles) {
                    user.permissions = user.permissions.concat(r.permissions);
                }
                break;
        }
        return user;
    }
}
