import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find();
  }

  async findOne(
    filter: FilterQuery<ProductDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<Product> {
    return this.productModel.findOne(filter, projection, options);
  }

  async find(
    filter: FilterQuery<ProductDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<Product[]> {
    return this.productModel.findOne(filter, projection, options);
  }

  async findById(
    _id: string,
    projection?: any,
    options?: QueryOptions,
  ): Promise<ProductDocument> {
    return this.productModel.findById(_id, projection, options);
  }

  async findByIdAndUpdate(
    _id: string,
    updateProduct: UpdateQuery<ProductDocument>,
    options?: QueryOptions,
  ): Promise<ProductDocument> {
    return this.productModel.findByIdAndUpdate(_id, updateProduct, {
      ...options,
      new: true,
    });
  }

  async findByIdAndDelete(_id: string, options?: QueryOptions): Promise<any> {
    return this.productModel.findByIdAndDelete(_id, options);
  }
}
