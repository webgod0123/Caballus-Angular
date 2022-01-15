import { IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RoleSettingsDto {
    @IsBoolean()
    @ApiModelProperty()
    public canEdit: boolean;

    @IsBoolean()
    @ApiModelProperty()
    public canDelete: boolean;

}

