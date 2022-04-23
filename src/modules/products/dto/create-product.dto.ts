import { OmitType } from '@nestjs/mapped-types';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, ['_id', 'figure']) {}
