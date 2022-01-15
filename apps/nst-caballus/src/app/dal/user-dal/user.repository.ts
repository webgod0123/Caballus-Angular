import { Injectable } from '@nestjs/common';
import {
    MongoRepository,
    FindParams,
    ObjectId,
    MongoCollectionName,
    stringLike,
    stringEqual,
    UpdateParams,
    numberMatch
} from '@rfx/nst-db/mongo';
import { User, FullUser, UserGridParams } from '@caballus/api-common';
import { Status } from '@rfx/common';
import { GridParams, PaginatedList } from '@rfx/common';
import { pipe } from 'rxjs';

@MongoCollectionName('user')
@Injectable()
export class UserRepository extends MongoRepository {
    /**
     * Gets an active user by their email address.
     *
     * Make sure the `status` field is included on the database index.
     *
     * @param email
     * @returns The user or null if not found
     */
    public async getUserByEmail(email: string): Promise<User> {
        const params = new FindParams({ query: { 'profile.email': email, status: Status.Active } });
        return this.findOne<FullUser>(params);
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

    public async getGridUsers(
        gridParams: UserGridParams
    ): Promise<PaginatedList<User>> {
        const findParams = new FindParams(gridParams.grid);
        findParams.getCount = true;
        if (gridParams.filters.searchTerm.value) {
            findParams.query = pipe(
                stringLike(
                    ['profile.firstName', 'profile.lastName'],
                    gridParams.filters.searchTerm.value
                )
            )([]);
        }
        return new PaginatedList<User>(await this.find<User>(findParams), User);
    }

    /**
     * Inserts a new user into the DB
     *
     * @param user
     * @returns The id of the newly inserted user
     */
    public async createUser(user: FullUser): Promise<ObjectId> {
        return this.create(user);
    }

    /**
     * Delete roles by id list
     *
     * @param ids
     * @returns void
     */
    public async deleteUsersByIdList(ids: ObjectId[]): Promise<void> {
        const params = new UpdateParams();
        params.updateMultiple = true;
        params.query = pipe(
            numberMatch('status', Status.Active)
        )([]);
        await this.updateByIdList(
            ids,
            { status: Status.InActive },
            params
        );
    }

    /**
     * Edit a User
     *
     * @param id
     * @Param user
     * @returns void
     */
    public async editUser(id: ObjectId, user: Partial<User>): Promise<void> {
        await this.updateById(id, user);
    }
}
