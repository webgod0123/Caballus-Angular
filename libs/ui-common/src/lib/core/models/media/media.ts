import { MediaWithoutIds } from '@caballus/common';

export class Media extends MediaWithoutIds {
    public _id: string;
    public collectionId: string;

    constructor(params?: Partial<Media>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.collectionId = params.collectionId || this.collectionId;
        }
    }
}
