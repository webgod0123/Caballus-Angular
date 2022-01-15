import { BaseMediaDocument } from './base-media-document';
import { MediaCollectionName } from '../../enums';
import { BaseDoc } from '../base/base-doc';

export class MediaWithoutIds extends BaseDoc {
    public _id: any;
    public collection: MediaCollectionName;
    public collectionId: any;
    public latest: BaseMediaDocument = null;
    public history: BaseMediaDocument[] = [];
    public isProfileImage: boolean = false;

    constructor(params?: Partial<MediaWithoutIds>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.collection = params.collection || this.collection;
            this.collectionId = params.collectionId || this.collectionId;
            this.latest = params.latest || this.latest;
            this.history = !!params.history ? params.history.map(h => new BaseMediaDocument(h)) : this.history;
            this.isProfileImage = params.isProfileImage || this.isProfileImage;
        }
    }
}
