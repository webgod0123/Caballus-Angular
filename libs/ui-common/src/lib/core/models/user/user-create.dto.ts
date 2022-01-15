import { User } from './user';
import { Timezone } from '@caballus/common';

export class UserCreateDto {
    public email: string = '';
    public firstName: string = '';
    public lastName: string = '';
    public phone: string = '';
    public timezone: string = Timezone.Mountain;
    public roleIds: string[] = [];

    constructor(params?: Partial<UserCreateDto>) {
        if (!!params) {
            this.email = params.email || this.email;
            this.firstName = params.firstName || this.firstName;
            this.lastName = params.lastName || this.lastName;
            this.phone = params.phone || this.phone;
            this.timezone = params.timezone || this.timezone;
            this.roleIds = params.roleIds || this.roleIds;
        }
    }

    /**
     * Construct a new instance of this dto from an instance of another class
     */
    public static from<T extends User>(
        type: { new (params: Partial<T>): T },
        value: T
    ): UserCreateDto {
        if (type === User) {
            return new UserCreateDto({
                email: value.profile.email,
                firstName: value.profile.firstName,
                lastName: value.profile.lastName,
                phone: value.profile.phone,
                timezone: value.profile.timezone,
                roleIds: value.roleIds
            });
        }

        return new UserCreateDto();
    }
}
