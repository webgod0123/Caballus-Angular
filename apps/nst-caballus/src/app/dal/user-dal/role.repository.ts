import { Injectable } from '@nestjs/common';
import {
    MongoRepository,
    FindParams,
    ObjectId,
    MongoCollectionName,
    boolMatch
} from '@rfx/nst-db/mongo';
import { Role } from '@caballus/api-common';
import { MapClass } from '@rfx/nst-common';
import { pipe } from 'rxjs';

@MongoCollectionName('role')
@Injectable()
export class RoleRepository extends MongoRepository {

    /**
     * Get roles by id list
     *
     * @param ids
     * @returns Array of roles
     */
    @MapClass(Role)
    public async getRolesByIdList(ids: ObjectId[]): Promise<Role[]> {
        const res = await this.findByIdList<Role>(ids, new FindParams());
        return res[0];
    }

    @MapClass(Role)
    public async getNewUserDefaultRole(): Promise<Role> {
        const params = new FindParams();
        params.query = pipe(
            boolMatch('settings.newUserDefault', true)
        )({});
        return this.findOne<Role>(params);
    }

}
