import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  sub: string;

  @IsString()
  @ApiProperty({
    required: true,
  })
  username: string;

  @IsNumber()
  @ApiProperty({
    required: true,
  })
  exp: number;

  @IsNumber()
  @ApiProperty({
    required: true,
  })
  iat: number;
}
