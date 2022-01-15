import { IsString, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserRegistrationDto {
    @IsString()
    @ApiModelProperty()
    public firstName: string;

    @IsString()
    @ApiModelProperty()
    public lastName: string;

    @IsEmail()
    @ApiModelProperty()
    public email: string;

    @IsString()
    @ApiModelProperty()
    public password: string;
}
