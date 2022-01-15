import { Injectable } from '@nestjs/common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { Role, RoleGridParams } from '@caballus/api-common';
import { RoleRepository } from './role.repository';
import { PaginatedListModel, GridParams } from '@rfx/common';

@Injectable()
export class RoleService {
    constructor(private readonly _roleRepo: RoleRepository) {}

    /**
     * Gets an active role by their id
     *
     * @param id
     * @returns The role or null if not found
     */
    public async getRoleById(id: ObjectId): Promise<Role> {
        return this._roleRepo.getRoleById(id);
    }

    /**
     * Create a Role
     *
     * @param id
     * @returns The role id
     */
    public async createRole(role: Partial<Role>): Promise<ObjectId> {
        return this._roleRepo.createRole(role);
    }

    /**
     * Update a Role
     *
     * @param id
     * @returns void
     */
    public async updateRole(id: ObjectId, update: Partial<Role>): Promise<void> {
        await this._roleRepo.updateRole(id, update);
    }

    /**
     * Get roles by id list
     *
     * @param ids
     * @returns Array of roles
     */
    public async getRolesByIdList(ids: ObjectId[]): Promise<Role[]> {
        return this._roleRepo.getRolesByIdList(ids);
    }

    public async getGridRoles(gridParams: RoleGridParams): Promise<PaginatedListModel<Role>> {
        return this._roleRepo.getGridRoles(gridParams);
    }

    /**
     * Delete roles by id list
     *
     * @param ids
     * @returns void
     */
    public async deleteRolesByIdList(ids: ObjectId[]): Promise<void> {
        return this._roleRepo.deleteRolesByIdList(ids);
    }

    /**
     * Get all Roles
     *
     * @returns void
     */
    public async getRoles(): Promise<Role[]> {
        return this._roleRepo.getRoles();
    }

}
