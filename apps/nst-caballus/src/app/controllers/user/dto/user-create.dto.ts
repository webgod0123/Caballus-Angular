import { IsString, IsArray, IsIn, ValidateNested, IsDefined, IsEmail, IsOptional, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectIdList, transformObjectId } from '@rfx/nst-db/mongo';
import { Timezone } from '@caballus/api-common';


export class UserCreateDto {
    @IsEmail()
    @ApiModelProperty()
    public email: string;

    @IsString()
    @ApiModelProperty()
    public firstName: string;

    @IsString()
    @ApiModelProperty()
    public lastName: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    public phone: string;

    @IsString()
    @IsOptional()
    @IsIn(Timezone.members)
    @ApiModelProperty()
    public timezone: Timezone;

    @IsArray()
    @ArrayMinSize(1)
    @IsObjectId({ each: true })
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public roleIds: ObjectId[];
}
