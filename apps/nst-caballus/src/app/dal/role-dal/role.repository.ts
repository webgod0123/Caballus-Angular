import { Injectable } from '@nestjs/common';
import {
    MongoRepository,
    FindParams,
    ObjectId,
    stringLike,
    MongoCollectionName,
    UpdateParams,
    numberMatch,
    boolMatch
} from '@rfx/nst-db/mongo';
import { Status } from '@rfx/common';
import { Role, RoleGridParams } from '@caballus/api-common';
import { pipe } from 'rxjs';
import { GridParams, PaginatedList } from '@rfx/common';
import { MapClass } from '@rfx/nst-common';

@MongoCollectionName('role')
@Injectable()
export class RoleRepository extends MongoRepository {
    /**
     * Gets an active role by their id
     *
     * @param id
     * @returns The role or null if not found
     */
    @MapClass(Role)
    public async getRoleById(id: ObjectId): Promise<Role> {
        return this.findOneById<Role>(id, new FindParams());
    }

    /**
     * Create a Role
     *
     * @param id
     * @returns The role id
     */
    public async createRole(role: Partial<Role>): Promise<ObjectId> {
        return this.create(role);
    }

    /**
     * Update a Role
     *
     * @param id
     * @returns void
     */
    public async updateRole(id: ObjectId, update: Partial<Role>): Promise<void> {
        await this.updateById(id, update);
    }

    /**
     * Get roles by id list
     *
     * @param ids
     * @returns Array of roles
     */
    @MapClass(Role)
    public async getRolesByIdList(ids: ObjectId[]): Promise<Role[]> {
        const params = new FindParams();
        params.getAllResults(true);
        const res = await this.findByIdList<Role>(ids, params);
        return res[0];
    }

    public async getGridRoles(gridParams: RoleGridParams): Promise<PaginatedList<Role>> {
        const findParams = new FindParams(gridParams.grid);
        findParams.getCount = true;
        if (gridParams.filters.searchTerm.value) {
            findParams.query = pipe(stringLike(['name'], gridParams.filters.searchTerm.value))([]);
        }
        return new PaginatedList<Role>(await this.find<Role>(findParams), Role);
    }

    /**
     * Delete roles by id list
     *
     * @param ids
     * @returns void
     */
    public async deleteRolesByIdList(ids: ObjectId[]): Promise<void> {
        const params = new UpdateParams();
        params.updateMultiple = true;
        params.query = pipe(
            numberMatch('status', Status.Active),
            boolMatch('settings.canDelete', true)
        )([]);
        await this.updateByIdList(
            ids,
            { status: Status.InActive },
            params
        );
    }

    /**
     * Delete a Role
     *
     * @param id
     * @returns void
     */
    public async deleteRole(id: ObjectId): Promise<void> {
        await this.updateById(id, { status: Status.InActive });
    }

    /**
     * Get all Roles
     *
     * @returns void
     */
    @MapClass(Role)
    public async getRoles(): Promise<Role[]> {
        const findParams = new FindParams();
        findParams.getAllResults(true);
        const res = await this.find<Role>(findParams);
        return res[0];
    }

}
