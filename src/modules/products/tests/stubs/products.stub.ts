import { ProductDto } from '../../dto/product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

export const productStub = () => {
  return {
    _id: 'wqerwtyru',
    name: 'Teste',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};

export const updateProductStub = () => {
  return {
    name: 'Teste 2',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};
