import { productStub, updateProductStub } from '../tests/stubs/products.stub';

export const ProductsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(productStub()),
  findAll: jest.fn().mockResolvedValue([productStub()]),
  findOne: jest.fn().mockResolvedValue(productStub()),
  update: jest
    .fn()
    .mockResolvedValue({ _id: productStub()._id, ...updateProductStub() }),
  remove: jest
    .fn()
    .mockResolvedValue({ _id: productStub()._id, ...updateProductStub() }),
});
