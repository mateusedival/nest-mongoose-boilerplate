import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  create(createProductDto: CreateProductDto) {
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
