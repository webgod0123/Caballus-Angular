import { LoginType } from '../../enums';

export class UserLogin {
    public type: LoginType = null;
    public key: string = '';

    constructor(params?: Partial<UserLogin>) {
        if (!!params) {
            this.type = params.type || this.type;
            this.key = params.key || this.key;
        }
    }
}
