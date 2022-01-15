import { AuthService } from './auth-dal/auth.service';
import { AuthDalModule } from './auth-dal/auth-dal.module';
import { UserService } from './user-dal/user.service';
import { UserDalModule } from './user-dal/user-dal.module';
import { RoleDalModule } from './role-dal/role-dal.module';
import { RoleService } from './role-dal/role.service';
import { MediaDalModule } from './media-dal/media-dal.module';
import { MediaService } from './media-dal/media.service';

export const dalModules = [
    AuthDalModule,
    RoleDalModule,
    UserDalModule,
    MediaDalModule
];

export {
    AuthService,
    AuthDalModule,
    MediaService,
    RoleService,
    RoleDalModule,
    UserService,
    UserDalModule,
    MediaDalModule
};
