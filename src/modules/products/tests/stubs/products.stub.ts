import { ProductDto } from '../../dto/product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

export const productStub = (): ProductDto => {
  return {
    _id: 'wqerwtyru',
    name: 'Teste',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};

export const updateProductStub = (): UpdateProductDto => {
  return {
    name: 'Teste 2',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};
