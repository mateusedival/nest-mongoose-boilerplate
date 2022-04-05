import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByUsername(createUserDto.username);

    if (user) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPassword = await argon2.hash(createUserDto.password, {
      type: 2,
    });

    const result = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = result.toObject();

    return newUser;
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne(
      { username },
      { password: 1 },
      { lean: true },
    );
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
