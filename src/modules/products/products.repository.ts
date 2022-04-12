import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GenericRepository } from '../../shared/database/repository/generic.repository';

export class ProductsRepository extends GenericRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return super.create(createProductDto);
  }

  async insertMany(
    createProductDto: CreateProductDto[],
  ): Promise<ProductDocument[]> {
    return super.insertMany(createProductDto);
  }
}
