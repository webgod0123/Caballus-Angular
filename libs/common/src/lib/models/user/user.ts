import { BaseDoc } from '../base/base-doc';
import { UserProfileWithoutIds } from './user-profile';
import { UserSettings } from './user-settings';

/**
 * Does not include password or other sensitive fields, for that see the
 * `FullUserWithoutIds` class.
 */

export class UserWithoutIds extends BaseDoc {
    public _id: any;
    public roleIds: any[] = [];
    public tagIds: any[] = [];
    public profile: UserProfileWithoutIds = new UserProfileWithoutIds();
    public settings: UserSettings = new UserSettings();

    constructor(params?: Partial<UserWithoutIds>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.roleIds = Array.isArray(params.roleIds) ? params.roleIds : this.roleIds;
            this.profile = !!params.profile
                ? new UserProfileWithoutIds(params.profile)
                : this.profile;
            this.settings = !!params.settings ? new UserSettings(params.settings) : this.settings;
        }
    }
}
