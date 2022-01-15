import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AuthDalModule } from '../auth-dal/auth-dal.module';
import { RoleRepository } from './role.repository';

@Module({
    imports: [AuthDalModule],
    providers: [UserService, UserRepository, RoleRepository],
    exports: [UserService]
})
export class UserDalModule {}
