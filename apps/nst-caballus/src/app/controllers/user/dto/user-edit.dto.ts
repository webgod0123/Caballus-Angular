import { IsString, IsArray, IsIn, ValidateNested, IsDefined, IsEmail, IsOptional, ArrayMinSize, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectIdList } from '@rfx/nst-db/mongo';
import { Timezone } from '@caballus/api-common';
import { UserCreateDto } from './user-create.dto';

export class UserEditDto extends UserCreateDto {
    @IsBoolean()
    @IsOptional()
    @ApiModelProperty()
    public acceptedTerms: boolean;
}
