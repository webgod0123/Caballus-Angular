export class UserProfileWithoutIds {
    public _id: any;
    public firstName: string = '';
    public lastName: string = '';
    public phone: string = '';
    public email: string = '';
    public timezone: string = '';

    constructor(params?: Partial<UserProfileWithoutIds>) {
        if (!!params) {
            this._id = params._id || this._id;
            this.firstName = params.firstName || this.firstName;
            this.lastName = params.lastName || this.lastName;
            this.phone = params.phone || this.phone;
            this.email = params.email || this.email;
            this.timezone = params.timezone || this.timezone;
        }
    }
}
