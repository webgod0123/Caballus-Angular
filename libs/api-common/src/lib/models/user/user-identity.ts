import { UserIdentityWithoutIds } from '@caballus/common';
import { ObjectId } from '@rfx/nst-db/mongo';

export class UserIdentity extends UserIdentityWithoutIds {
    public _id: ObjectId = new ObjectId();

    constructor(params?: Partial<UserIdentity>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
