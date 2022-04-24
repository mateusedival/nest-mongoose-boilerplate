import { Types } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByUsername(createUserDto.username);

    if (user) {
      throw new BadRequestException('Username already in use');
    }

    const _id = new Types.ObjectId().toHexString();

    const { access_token } = await this.authService.createToken({
      _id,
      username: createUserDto.username,
    });

    return this.usersRepository.create({
      ...createUserDto,
      _id,
      token: access_token,
    });
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ username }, {}, { lean: true });
  }

  findById(id: string) {
    return this.usersRepository.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.findByIdAndDelete(id);
  }
}
