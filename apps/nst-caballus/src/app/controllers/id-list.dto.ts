import { IsEmail, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId, transformObjectIdList, ObjectId } from '@rfx/nst-db/mongo/src';
import { Transform } from 'class-transformer';

export class IdListDto {
    @IsArray()
    @IsNotEmpty()
    @IsObjectId({ each: true })
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public ids: ObjectId[];
}
