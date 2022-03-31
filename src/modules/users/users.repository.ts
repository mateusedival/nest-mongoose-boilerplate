import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model, FilterQuery, QueryOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(
    filter: FilterQuery<UserDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<User> {
    return this.userModel.findOne(filter, projection, options);
  }

  async find(
    filter: FilterQuery<UserDocument>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<User[]> {
    return this.userModel.findOne(filter, projection, options);
  }

  async findById(
    _id: string,
    projection?: any,
    options?: QueryOptions,
  ): Promise<User> {
    return this.userModel.findById(_id, projection, options);
  }

  async findByIdAndUpdate(
    _id: string,
    updateUser: UpdateUserDto,
    options?: QueryOptions,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(_id, updateUser, {
      ...options,
      new: true,
    });
  }

  async findByIdAndDelete(_id: string, options?: QueryOptions): Promise<any> {
    return this.userModel.findByIdAndDelete(_id, options);
  }
}
