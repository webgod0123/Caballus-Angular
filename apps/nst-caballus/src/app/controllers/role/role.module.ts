import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleDalModule } from '@nst-caballus/dal';

@Module({
    controllers: [RoleController],
    imports: [RoleDalModule]
})
export class RoleModule {}
