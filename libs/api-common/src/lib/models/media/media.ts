import { ObjectId } from 'bson';
import { MediaWithoutIds } from '@caballus/common';
import { parseObjectId } from '@rfx/njs-db/mongo/src';

export class Media extends MediaWithoutIds {
    public _id: ObjectId;
    public collectionId: ObjectId;

    constructor(params?: Partial<Media>) {
        super(params);
        if (!!params) {
            this._id = !!params._id ? parseObjectId(params._id) : this._id;
            this.collectionId = !!params.collectionId ? parseObjectId(params.collectionId) : this.collectionId;
        }
    }
}
