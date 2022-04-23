import { ApiProperty } from '@nestjs/swagger';
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
  @IsNumber()
  @ApiProperty({ name: 'price', example: 10 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'quantity', example: 5 })
  quantity: number;

  @IsOptional()
  @ApiProperty({ name: 'figure', type: FileDto, required: false })
  figure: FileDto;
}
