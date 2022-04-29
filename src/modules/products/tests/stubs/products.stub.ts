import { ProductDto } from '../../dto/product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

export const productStub = (): ProductDto => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'Test',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};

export const updateProductStub = (): UpdateProductDto => {
  return {
    name: 'Test 2',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};
