import { OmitType } from '@nestjs/mapped-types';
import { CreateFileDto } from 'src/modules/files/dto/create-file.dto';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, ['_id', 'figure']) {
  figure: CreateFileDto;
}
