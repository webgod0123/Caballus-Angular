import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ForgotDto {
    @IsEmail()
    @ApiModelProperty()
    public email: string;
}
