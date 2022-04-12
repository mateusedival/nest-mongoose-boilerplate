import { Model, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class GenericRepository<T> {
  constructor(protected genericModel: Model<T>) {}

  async create(createEntityDto: unknown): Promise<T> {
    return this.genericModel.create(createEntityDto);
  }

  async insertMany(createEntityDto: unknown[]): Promise<T[]> {
    return this.genericModel.insertMany(createEntityDto);
  }

  async findAll(): Promise<T[]> {
    return this.genericModel.find().exec();
  }

  async findOne(
    filter: FilterQuery<T>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<T> {
    return this.genericModel.findOne(filter, projection, options).exec();
  }

  async find(
    filter: FilterQuery<T>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<T[]> {
    return this.genericModel.find(filter, projection, options).exec();
  }

  async findById(
    _id: string,
    projection?: any,
    options?: QueryOptions,
  ): Promise<T> {
    return this.genericModel.findById(_id, projection, options).exec();
  }

  async findByIdAndUpdate(
    _id: string,
    updateEntity: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<T> {
    return this.genericModel
      .findByIdAndUpdate(_id, updateEntity, {
        ...options,
        new: true,
      })
      .exec();
  }

  async updateMany(
    filter: FilterQuery<T>,
    updateEntity: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<any> {
    return this.genericModel
      .updateMany(filter, updateEntity, {
        ...options,
        new: true,
      })
      .exec();
  }

  async findByIdAndDelete(_id: string, options?: QueryOptions): Promise<any> {
    return this.genericModel.findByIdAndDelete(_id, { options }).exec();
  }

  async deleteMany(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<any> {
    return this.genericModel.deleteMany(filter, { options }).exec();
  }
}
