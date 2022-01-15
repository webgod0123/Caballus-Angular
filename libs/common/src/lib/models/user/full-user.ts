import { UserWithoutIds } from './user';
import { UserLogin } from './user-login';

/**
 * User document containing secure fields. Only secured fields should go here
 * Other public fields should go in the `UserWithoutIds` class
 */

export class FullUserWithoutIds extends UserWithoutIds {
    public logins: UserLogin[] = [];

    constructor(params?: Partial<FullUserWithoutIds>) {
        super(params);
        if (!!params) {
            this.logins = Array.isArray(params.logins)
                ? params.logins.map(l => new UserLogin(l))
                : this.logins;
        }
    }
}
