import { productStub, updateProductStub } from '../tests/stubs/products.stub';

export const ProductsRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(productStub()),
  findAll: jest.fn().mockResolvedValue([productStub()]),
  findById: jest.fn().mockResolvedValue(productStub()),
  findByIdAndUpdate: jest
    .fn()
    .mockResolvedValue({ _id: productStub()._id, ...updateProductStub() }),
  findByIdAndDelete: jest
    .fn()
    .mockResolvedValue({ _id: productStub()._id, ...updateProductStub() }),
});
