import { OmitType } from '@nestjs/swagger';
import { CreateFileDto } from '../../files/dto/create-file.dto';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, ['_id', 'figure']) {
  figure: CreateFileDto;
}
