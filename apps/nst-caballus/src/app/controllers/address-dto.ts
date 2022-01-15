import { IsString, IsOptional, Length, IsUppercase } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { State } from '@caballus/api-common';

export class AddressDto {
    @IsString()
    @ApiModelProperty()
    public line1: string;

    @IsString()
    @ApiModelProperty()
    @IsOptional()
    public line2: string;

    @IsString()
    @ApiModelProperty()
    public city: string;

    @IsString()
    // tslint:disable-next-line: no-magic-numbers
    @Length(2, 2)
    @ApiModelProperty()
    @IsUppercase()
    public state: State;

    @IsString()
    @ApiModelProperty()
    public postalCode: string;
}
