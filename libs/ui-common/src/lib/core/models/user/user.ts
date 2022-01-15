import { UserWithoutIds, Permission } from '@caballus/common';
import { UserProfile } from './user-profile';

export class User extends UserWithoutIds {
    public _id: string;
    public roleIds: string[] = [];
    public profile: UserProfile = new UserProfile();
    /*
        permissions for ui-common model populated on
        login using getLoggedInUser() endpoint
    */
    public permissions: Permission[] = [];

    constructor(params?: Partial<User>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.roleIds = Array.isArray(params.roleIds)
                ? params.roleIds
                : this.roleIds;
            this.profile = !!params.profile
                ? new UserProfile(params.profile)
                : this.profile;
            this.permissions = Array.isArray(params.permissions)
                ? params.permissions
                : this.permissions;
        }
    }
}
