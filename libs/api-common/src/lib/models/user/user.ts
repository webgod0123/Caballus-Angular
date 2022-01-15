import { UserWithoutIds, Permission } from '@caballus/common';
import { ObjectId, parseObjectIdList, parseObjectId } from '@rfx/nst-db/mongo';

export class User extends UserWithoutIds {
    public _id: ObjectId = new ObjectId();
    public tagIds: ObjectId[] = [];
    public roleIds: ObjectId[] = [];

    // This field is only set when the object is gotten from the @LoggedInUser
    // decorator
    public permissions?: Permission[] = [];

    constructor(params?: Partial<User>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.tagIds = Array.isArray(params.tagIds)
                ? parseObjectIdList(params.tagIds)
                : this.tagIds;
            this.roleIds = Array.isArray(params.roleIds)
                ? parseObjectIdList(params.roleIds)
                : this.roleIds;
        }
    }
}
