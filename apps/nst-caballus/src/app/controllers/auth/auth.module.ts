import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthDalModule } from '@nst-caballus/dal';

@Module({
    controllers: [AuthController],
    imports: [AuthDalModule]
})
export class AuthModule {}
