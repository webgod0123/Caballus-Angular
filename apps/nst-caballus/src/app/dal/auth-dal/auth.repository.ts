import { Injectable } from '@nestjs/common';
import { MongoRepository, FindParams, UpdateParams, MongoCollectionName, ObjectId } from '@rfx/nst-db/mongo';
import { FullUser, LoginType, User } from '@caballus/api-common';
import { Status } from '@rfx/common';

@MongoCollectionName('user')
@Injectable()
export class AuthRepository extends MongoRepository {
    /**
     * Gets an active "full user" (user with secure fields like password
     * included) by their email.
     */
    public async getUserByEmail(email: string): Promise<FullUser> {
        const params = new FindParams({ query: { 'profile.email': email, status: Status.Active } });
        return this.findOne<FullUser>(params);
    }

    /**
     * Update the password hash for the 'Web' login type on the given user. Note
     * that this function expects the *hashed* password, not plaintext.
     *
     * @param email
     * @param hash The hash of the new password
     */
    public async updatePasswordHash(email: string, hash: string): Promise<void> {
        const params = new UpdateParams(false);
        params.query = {
            'profile.email': email,
            'logins.type': LoginType.Web,
            status: Status.Active
        };
        await this.update({ 'logins.$.key': hash }, params);
    }

    /**
     * Gets an active user by their id
     *
     * @param id
     * @returns The user or null if not found
     */
    public async getUserById(id: ObjectId): Promise<User> {
        return this.findOneById<User>(id, new FindParams());
    }
}
