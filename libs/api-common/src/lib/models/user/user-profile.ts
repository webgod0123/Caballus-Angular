import { UserProfileWithoutIds } from '@caballus/common';
import { ObjectId } from '@rfx/nst-db/mongo';

export class UserProfile extends UserProfileWithoutIds {
    public _id: ObjectId = new ObjectId();

    constructor(params?: Partial<UserProfile>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
