import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class productDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'name', example: 'Cozy Shirt' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'description', example: 'A cozy shirt' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'price', example: 10 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'quantity', example: 5 })
  quantity: number;
}
