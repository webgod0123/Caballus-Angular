import { Injectable } from '@nestjs/common';
import {
    MongoRepository,
    FindParams,
    MongoCollectionName,
    ObjectId
} from '@rfx/nst-db/mongo';

@MongoCollectionName('token')
@Injectable()
export class TokenRepository extends MongoRepository {
    /**
     * Inserts a token
     * The expireDate is used as a TTL and will be automatically removed from db
     *
     * @param user
     * @returns The id of the newly inserted token
     */
    public async createToken(userId: ObjectId, expireDate: Date, absoluteUserId?: ObjectId): Promise<ObjectId> {
        const token = {
            userId: userId,
            expireDate: expireDate,
            absoluteUserId: !!absoluteUserId
                ? absoluteUserId : null
        };
        return this.create(token);
    }

    /**
     * Checks to see if the token document exists.
     *
     * @param id ObjectId
     * @param userId ObjectId
     * @returns boolean
     */
    public async isTokenActive(id: ObjectId, userId: ObjectId, absoluteUserId?: ObjectId): Promise<boolean> {
        const params = new FindParams({ query: { userId: userId } });
        if (!!absoluteUserId) {
            params.query.absoluteUserId = absoluteUserId;
        }
        const token = await this.findOneById(id, params);
        // if the token is found, it has not expired
        return token !== null;
    }
}
