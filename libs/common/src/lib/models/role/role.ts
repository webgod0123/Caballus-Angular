import { BaseDoc } from '../base/base-doc';
import { Permission } from '../../enums';
import { RoleSettings } from './role-settings';

export class RoleWithoutIds extends BaseDoc {
    public _id: any;
    public name: string = '';
    public permissions: Permission[] = [];
    public settings: RoleSettings = new RoleSettings();

    constructor(params?: Partial<RoleWithoutIds>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.name = params.name || this.name;
            this.permissions = Array.isArray(params.permissions)
                ? params.permissions
                : this.permissions;
            this.settings = !!params.settings ? new RoleSettings(params.settings) : this.settings;
        }
    }
}
