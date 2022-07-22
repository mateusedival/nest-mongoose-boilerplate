import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersRepository } from './users.repository';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    makeCounterProvider({ help: 'Registered users', name: 'quantity_users' }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
