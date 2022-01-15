import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleGridFilters } from '@caballus/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class RoleFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    public toRoleGridFilters(): RoleGridFilters {
        return new RoleGridFilters(this);
    }
}
