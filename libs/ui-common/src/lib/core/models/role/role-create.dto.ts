import { Role } from './role';
import { RoleSettings, Permission } from '@caballus/common';

export class RoleCreateDto {
    public name: string = '';
    public permissions: Permission[] = [];
    public settings: RoleSettings;

    constructor(params?: Partial<RoleCreateDto>) {
        if (!!params) {
            this.name = params.name || this.name;
            this.permissions = params.permissions || this.permissions;
            this.settings = new RoleSettings(params.settings);
        }
    }

    /**
     * Construct a new instance of this dto from an instance of another class
     */
    public static from<T extends Role>(
        type: { new (params: Partial<T>): T },
        value: T
    ): RoleCreateDto {
        if (type === Role) {
            return new RoleCreateDto({
                name: value.name,
                permissions: value.permissions,
                settings: value.settings
            });
        }

        return new RoleCreateDto();
    }
}
