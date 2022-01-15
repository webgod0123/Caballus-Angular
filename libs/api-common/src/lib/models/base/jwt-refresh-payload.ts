import { JwtTokenType } from '../../enums';
export class JwtRefreshPayload {
    public refreshId: string;
    public userId: string;
    public tokenType: JwtTokenType;
    public absoluteUserId: string = null;

    constructor(
        refreshId: string,
        userId: string,
        tokenType: JwtTokenType = JwtTokenType.Refresh,
        absoluteUserId: string = null,
    ) {
        this.refreshId = refreshId;
        this.userId = userId;
        this.tokenType = tokenType;
        this.absoluteUserId = !!absoluteUserId
            ? absoluteUserId : this.absoluteUserId;
    }
}
