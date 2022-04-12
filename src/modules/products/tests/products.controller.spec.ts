import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductDocument } from '../products.schema';
import { ProductsService } from '../products.service';
import { productStub, updateProductStub } from './stubs/products.stub';

jest.mock('../products.service.ts');

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsController.create(productStub());
    });

    test('should call productsServices', () => {
      expect(productsService.create).toBeCalledWith(productStub());
    });

    test('should return a product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('findAll', () => {
    let product: ProductDocument[];

    beforeEach(async () => {
      product = await productsController.findAll();
    });

    test('should call productsServices', () => {
      expect(productsService.findAll).toBeCalled();
    });

    test('should return a product', () => {
      expect(product).toEqual([productStub()]);
    });
  });

  describe('findOne', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsController.findOne(productStub()._id);
    });

    test('should call productsServices', () => {
      expect(productsService.findOne).toBeCalledWith(productStub()._id);
    });

    test('should return a product', () => {
      expect(product).toEqual(productStub());
    });
  });

  describe('update', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsController.update(
        productStub()._id,
        updateProductStub(),
      );
    });

    test('should call productsServices', () => {
      expect(productsService.update).toBeCalledWith(
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
      product = await productsController.remove(productStub()._id);
    });

    test('should call productsServices', () => {
      expect(productsService.remove).toBeCalledWith(productStub()._id);
    });

    test('should return a product', () => {
      expect(product).toEqual({
        _id: productStub()._id,
        ...updateProductStub(),
      });
    });
  });
});
