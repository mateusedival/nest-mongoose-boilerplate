import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { updateUserStub, userStub, userStubWithPwd } from './stubs/users.stub';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    let user;

    beforeEach(async () => {
      user = await usersController.create(userStubWithPwd());
    });

    test('should call usersServices', () => {
      expect(usersService.create).toBeCalledWith(userStubWithPwd());
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('findAll', () => {
    let user;

    beforeEach(async () => {
      user = await usersController.findAll();
    });

    test('should call usersServices', () => {
      expect(usersService.findAll).toBeCalled();
    });

    test('should return a user', () => {
      expect(user).toEqual([userStub()]);
    });
  });

  describe('findOne', () => {
    let user;

    beforeEach(async () => {
      user = await usersController.findOne(userStub()._id);
    });

    test('should call usersServices', () => {
      expect(usersService.findById).toBeCalledWith(userStub()._id);
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('update', () => {
    let user;

    beforeEach(async () => {
      user = await usersController.update(userStub()._id, updateUserStub());
    });

    test('should call usersServices', () => {
      expect(usersService.update).toBeCalledWith(
        userStub()._id,
        updateUserStub(),
      );
    });

    test('should return a user', () => {
      expect(user).toEqual({
        _id: userStub()._id,
        ...updateUserStub(),
      });
    });
  });

  describe('remove', () => {
    let user;

    beforeEach(async () => {
      user = await usersController.remove(userStub()._id);
    });

    test('should call usersServices', () => {
      expect(usersService.remove).toBeCalledWith(userStub()._id);
    });

    test('should return a user', () => {
      expect(user).toEqual({
        _id: userStub()._id,
        ...updateUserStub(),
      });
    });
  });
});
