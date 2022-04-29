import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import FileDto from 'src/modules/files/dto/file.dto';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'name', example: 'Cozy Shirt', required: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'description', example: 'A cozy shirt' })
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ name: 'price' })
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ name: 'quantity' })
  quantity: number;

  @IsOptional()
  @ApiProperty({ name: 'figure', type: FileDto, required: false })
  figure?: FileDto;
}
