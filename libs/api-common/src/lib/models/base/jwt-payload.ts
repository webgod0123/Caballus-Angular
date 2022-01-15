import { ITokenPayload, JwtTokenType } from '@caballus/common';

export class JwtPayload implements ITokenPayload {
    public userId: string;
    public absoluteUserId: string;
    public tokenType: JwtTokenType;
    // implicit
    public iat: number;
    // implicit
    public exp: number;

    constructor(
        userId: string,
        tokenType: JwtTokenType = JwtTokenType.Standard,
        absoluteUserId: string = null,
    ) {
        this.userId = userId;
        this.tokenType = tokenType;
        this.absoluteUserId = !absoluteUserId ? userId : absoluteUserId;
    }
}
