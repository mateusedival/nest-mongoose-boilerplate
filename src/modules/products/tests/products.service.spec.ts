import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../../files/files.service';
import { ProductsRepository } from '../products.repository';
import { ProductDocument } from '../products.schema';
import { ProductsService } from '../products.service';
import { MockFilesService } from '../__mocks__/files.service';
import { filesStub } from './stubs/files.stub';
import { productStub, updateProductStub } from './stubs/products.stub';

jest.mock('../products.repository.ts');

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;
  let filesService: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        ProductsRepository,
        { provide: FilesService, useFactory: MockFilesService },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
    filesService = module.get<FilesService>(FilesService);
  });

  describe('create', () => {
    let product: ProductDocument;

    beforeEach(async () => {
      product = await productsService.create(productStub(), filesStub());
    });

    test('should call productsRepository', () => {
      expect(productsRepository.create).toBeCalledWith(productStub());
    });

    test('should call filesService', () => {
      expect(filesService.uploadFile).toBeCalledWith({
        buffer: filesStub().buffer,
        key: filesStub().originalname,
      });
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

    test('should call filesService', () => {
      expect(filesService.deleteFile).toBeCalledWith(productStub().figure.key);
    });

    test('should return a product', () => {
      expect(product).toEqual({
        _id: productStub()._id,
        ...updateProductStub(),
      });
    });
  });
});
