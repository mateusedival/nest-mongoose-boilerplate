import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly fileService: FilesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    figure: Express.Multer.File,
  ) {
    console.log(figure);
    const a = await this.fileService.uploadFile({
      buffer: figure.buffer,
      key: 'adfsd',
    });
    console.log('product service', a);
    return this.productsRepository.create(createProductDto);
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

  remove(id: string) {
    return this.productsRepository.findByIdAndDelete(id);
  }
}
