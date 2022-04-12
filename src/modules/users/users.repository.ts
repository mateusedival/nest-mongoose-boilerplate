import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GenericRepository } from 'src/shared/database/repository/generic.repository';

export class UsersRepository extends GenericRepository<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return super.create(createUserDto);
  }

  async insertMany(createUserDto: CreateUserDto[]): Promise<UserDocument[]> {
    return super.insertMany(createUserDto);
  }
}
