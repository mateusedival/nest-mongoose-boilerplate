import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin', required: true })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  hasAdmin: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}
