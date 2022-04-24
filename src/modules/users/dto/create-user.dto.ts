import { IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsOptional()
  _id: string;

  @IsOptional()
  token: string;
}
