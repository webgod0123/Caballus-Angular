import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleGridParams } from '@caballus/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { RoleFiltersDto } from './role-filters.dto';

export class RoleParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => RoleFiltersDto)
    @IsInstance(RoleFiltersDto)
    @ApiModelProperty()
    public filters: RoleFiltersDto;

    public toRoleGridParams(): RoleGridParams {
        return new RoleGridParams(this, this.filters);
    }
}
