import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../products.repository';
import { ProductDocument } from '../products.schema';
import { ProductsService } from '../products.service';
import { productStub, updateProductStub } from './stubs/products.stub';

jest.mock('../products.repository.ts');

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  describe('create', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsService.create(productStub());
    });

    test('should call productsRepository', () => {
      expect(productsRepository.create).toBeCalledWith(productStub());
    });

    test('should return a product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('findAll', () => {
    let product: ProductDocument[];

    beforeEach(async () => {
      product = await productsService.findAll();
    });

    test('should call productsRepository', () => {
      expect(productsRepository.findAll).toBeCalled();
    });

    test('should return a product', () => {
      expect(product).toEqual([productStub()]);
    });
  });

  describe('findOne', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsService.findOne(productStub()._id);
    });

    test('should call productsRepository', () => {
      expect(productsRepository.findById).toBeCalledWith(productStub()._id);
    });

    test('should return a product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('update', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsService.update(
        productStub()._id,
        updateProductStub(),
      );
    });

    test('should call productsRepository', () => {
      expect(productsRepository.findByIdAndUpdate).toBeCalledWith(
        productStub()._id,
        updateProductStub(),
      );
    });

    test('should return a product', () => {
      expect(product).toEqual({
        _id: productStub()._id,
        ...updateProductStub(),
      });
    });
  });

  describe('remove', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsService.remove(productStub()._id);
    });

    test('should call productsRepository', () => {
      expect(productsRepository.findByIdAndDelete).toBeCalledWith(
        productStub()._id,
      );
    });

    test('should return a product', () => {
      expect(product).toEqual({
        _id: productStub()._id,
        ...updateProductStub(),
      });
    });
  });
});
