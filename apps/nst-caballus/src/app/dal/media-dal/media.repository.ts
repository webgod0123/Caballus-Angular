import { Injectable } from '@nestjs/common';
import { MongoRepository, ObjectId, MongoCollectionName, UpdateParams } from '@rfx/nst-db/mongo';
import { Media } from '@caballus/api-common';
import { Status } from '@rfx/common';
import { UpdateWriteOpResult } from 'mongodb';

@MongoCollectionName('media')
@Injectable()
export class MediaRepository extends MongoRepository {

    /**
     * Edit a media file, inserts the given media document into the history
     * array and sets it as the latest. The id is the file name and vice versa.
     * If the media document doesn't already exist it will be created.
     *
     * @param mediaId The id/filename of the media instance
     * @param mediadoc The media document to insert into the database
     * @returns Mongo write results
     */
    public editMedia(mediadoc: Media): Promise<UpdateWriteOpResult> {
        const params = new UpdateParams();
        params.isUpsert = true;
        params.query = { _id: mediadoc._id };
        const update: object = {
            $set: { _id: mediadoc._id, latest: mediadoc },
            $push: { history: mediadoc }
        };
        return this.updateBase(update, params);
    }

    /**
     * Create Media
     *
     * @param media
     * @returns The media id
     */
    public async createMedia(media: Partial<Media>): Promise<ObjectId> {
        return this.create(media);
    }

    /**
     * Delete a media
     *
     * @param id
     * @returns void
     */
    public async deleteMedia(id: ObjectId): Promise<void> {
        await this.updateById(id, { status: Status.InActive });
    }
}
