import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Credentials {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  password: string;
}
