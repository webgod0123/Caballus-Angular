import { FullUserWithoutIds } from '@caballus/common';
import { ObjectId } from '@rfx/nst-db/mongo';

export class FullUser extends FullUserWithoutIds {
    public _id: ObjectId = new ObjectId();

    constructor(params?: Partial<FullUser>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
