import { RoleWithoutIds } from '@caballus/common';

export class Role extends RoleWithoutIds {
    public _id: string = '';

    constructor(params?: Partial<Role>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
