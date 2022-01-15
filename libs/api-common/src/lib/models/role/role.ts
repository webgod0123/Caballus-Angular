import { RoleWithoutIds } from '@caballus/common';
import { ObjectId, parseObjectId } from '@rfx/nst-db/mongo';

export class Role extends RoleWithoutIds {
    public _id: ObjectId;

    constructor(params?: Partial<Role>) {
        super(params);
        if (!!params) {
            this._id = !!params._id ? parseObjectId(params._id) : this._id;
        }
    }
}
