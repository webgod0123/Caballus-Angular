import { IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsEmail()
    @ApiModelProperty()
    public email: string;

    @IsString()
    @ApiModelProperty()
    public password: string;
}
