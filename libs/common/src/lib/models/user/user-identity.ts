export class UserIdentityWithoutIds {
    public _id: any;
    public fullName: string = '';

    constructor(params?: Partial<UserIdentityWithoutIds>) {
        if (!!params) {
            this._id = params._id || this._id;
            this.fullName = params.fullName || this.fullName;
        }
    }
}
