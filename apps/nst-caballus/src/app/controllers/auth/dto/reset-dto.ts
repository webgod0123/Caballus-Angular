import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResetDto {
    @IsString()
    @ApiModelProperty()
    public password: string;
}
