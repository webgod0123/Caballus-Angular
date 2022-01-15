import { TagWithoutIds } from '@caballus/common';

export class Tag extends TagWithoutIds {
    public _id: string = '';

    constructor(params?: Partial<Tag>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
