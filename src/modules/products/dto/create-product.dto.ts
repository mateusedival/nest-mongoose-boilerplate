import { OmitType } from '@nestjs/mapped-types';
import { productDto } from './product.dto';

export class CreateProductDto extends OmitType(productDto, ['_id']) {}
