import { IsString, IsArray, IsIn, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Permission, RoleSettings } from '@caballus/api-common';
import { ObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { RoleSettingsDto } from './role-settings-dto';

export class RoleDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsArray()
    @IsIn(Permission.members, { each: true })
    @ApiModelProperty()
    public permissions: Permission[];

    @IsDefined()
    @ValidateNested()
    @Type(() => RoleSettingsDto)
    @ApiModelProperty()
    public settings: RoleSettings;

}
