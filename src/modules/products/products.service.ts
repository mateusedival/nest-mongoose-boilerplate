import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly filesService: FilesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    figure: Express.Multer.File,
  ) {
    const { buffer, mimetype, originalname } = figure;

    const { Location, Key } = await this.filesService.uploadFile({
      buffer: buffer,
      key: originalname,
    });

    return this.productsRepository.create({
      figure: { mimetype, url: Location, key: Key },
      ...createProductDto,
    });
  }

  findAll() {
    return this.productsRepository.findAll();
  }

  findOne(id: string) {
    return this.productsRepository.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    const product = await this.productsRepository.findByIdAndDelete(id);
    await this.filesService.deleteFile(product.figure.key);
    return product;
  }
}
