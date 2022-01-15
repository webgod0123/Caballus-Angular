import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthDalModule, UserDalModule } from '@nst-caballus/dal';

@Module({
    controllers: [UserController],
    imports: [UserDalModule, AuthDalModule]
})
export class UserModule {}
