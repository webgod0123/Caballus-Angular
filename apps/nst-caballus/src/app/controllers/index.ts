import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

export const controllerModules = [
    AuthModule,
    RoleModule,
    UserModule
];
