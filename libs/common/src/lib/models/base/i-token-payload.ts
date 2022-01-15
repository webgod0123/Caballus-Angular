import { JwtTokenType } from '../../enums/base/jwt-token-type';

/**
 * The payload of an auth token. This contains details related to what user is
 * making the current request as well as metadata about the token
 */
export interface ITokenPayload {
    /**
     * Id of the current acting user.
     */
    userId: string;

    /**
     * This field is for impersonation and holds the id of the 'actual' user
     * who started the impersonation. When not impersonating this is the same
     * value as userId.
     */
    absoluteUserId: string;

    /**
     * What type of token this is. See the JwtTokenType enum for more details about
     * each token type.
     */
    tokenType: JwtTokenType;

    /**
     * RFC7519 "Expiration time" Claim
     *
     * https://tools.ietf.org/html/rfc7519#section-4.1.4
     */
    exp: number;

    /**
     * RFC7519 "Issued At" Claim
     *
     * https://tools.ietf.org/html/rfc7519#section-4.1.6
     */
    iat: number;
}
