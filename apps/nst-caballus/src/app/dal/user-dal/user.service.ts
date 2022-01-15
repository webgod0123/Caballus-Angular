import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ObjectId } from '@rfx/njs-db/mongo';
import {
    User,
    LoginType,
    FullUser,
    UserProfile,
    UserSettings,
    UserLogin,
    UserGridParams
} from '@caballus/api-common';
import { GridParams } from '@rfx/common';
import { PaginatedListModel } from '@rfx/nst-common';
import { AuthService } from '../auth-dal/auth.service';
import { RoleRepository } from './role.repository';
import { hash } from '@rfx/njs-security';

@Injectable()
export class UserService {
    constructor(
        private readonly _userRepo: UserRepository,
        private readonly _authService: AuthService,
        private readonly _roleRepo: RoleRepository
    ) {}

    /**
     * Gets an active user by their id
     *
     * @param id
     * @returns The user or null if not found
     */
    public async getUserById(id: ObjectId): Promise<User> {
        return this._userRepo.getUserById(id);
    }

    public async getGridUsers(
        gridParams: UserGridParams
    ): Promise<PaginatedListModel<User>> {
        return this._userRepo.getGridUsers(gridParams);
    }

    /**
     * Register a new user
     *
     * @param user
     * @returns The id of the newly inserted user
     */
    public async registerUser(
        newUser: {
            email: string;
            firstName: string;
            lastName: string;
            password: string;
        }
     ): Promise<ObjectId> {
        const role = await this._roleRepo.getNewUserDefaultRole();
        const _id = new ObjectId();
        const user = new FullUser({
            ...newUser,
            _id,
            roleIds: [role._id],
            profile: new UserProfile({
                ...newUser,
                _id
            }),
            logins: [new UserLogin({
                type: LoginType.Web,
                key: await hash(newUser.password)
            })]
        });
        return this._userRepo.createUser(user);
    }

    /**
     * Delete roles by id list
     *
     * @param ids
     * @returns void
     */
    public async deleteUsersByIdList(ids: ObjectId[]): Promise<void> {
        return this._userRepo.deleteUsersByIdList(ids);
    }

    public async createUser(
        newUser: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            timezone: string;
            roleIds: ObjectId[];
        }
    ): Promise<ObjectId> {
        const existingUser = await this._userRepo.getUserByEmail(newUser.email);
        if (!!existingUser) {
            throw new NotAcceptableException('User by that email already exists');
        }
        const selectedRoles = await this._roleRepo.getRolesByIdList(
            newUser.roleIds
        );
        if (selectedRoles.length !== newUser.roleIds.length) {
            throw new NotAcceptableException('Invalid roles selection');
        }
        const user = new FullUser({
            ...newUser,
            profile: new UserProfile({ ...newUser }),
            logins: [new UserLogin({
                type: LoginType.Web, key: null
            })]
        });
        const userId = await this._userRepo.createUser(user);
        await this._authService.forgotPassword(user.profile.email);
        return userId;
    }

    public async editUser(
        userId: ObjectId,
        editedUser: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            timezone: string;
            roleIds: ObjectId[];
            acceptedTerms: boolean;
        }
    ): Promise<void> {
        const existingUser = await this._userRepo.getUserById(userId);
        if (!!existingUser && existingUser.profile.email !== editedUser.email) {
            // Changing email
            const existingUserWithEmail = await this._userRepo.getUserByEmail(editedUser.email);
            if (!!existingUserWithEmail) {
                throw new NotAcceptableException('User by that email already exists');
            }
        }
        const selectedRoles = await this._roleRepo.getRolesByIdList(
            editedUser.roleIds
        );
        if (selectedRoles.length !== editedUser.roleIds.length) {
            throw new NotAcceptableException('Invalid roles selection');
        }
        const profile = new UserProfile({
            ...editedUser,
            _id: userId
        });
        const settings = new UserSettings({
            ...existingUser.settings,
            acceptedTerms: editedUser.acceptedTerms || false
        });
        const update = {
            profile,
            settings,
            roleIds: editedUser.roleIds
        };
        return this._userRepo.editUser(userId, update);
    }

    public async seenWelcomeModal(user: User): Promise<void> {
        user.settings.seenWelcomeModal = true;
        await this._userRepo.editUser(user._id, { settings: user.settings });
    }
}
