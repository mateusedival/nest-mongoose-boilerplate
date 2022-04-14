import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { updateUserStub, userStub, userStubWithPwd } from './stubs/users.stub';

jest.mock('../users.repository.ts');
jest.mock(
  'argon2',
  () => {
    return {
      hash: jest.fn().mockResolvedValue('12345678'),
    };
  },
  { virtual: true },
);

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    let user;

    beforeEach(async () => {
      user = await usersService.create(userStubWithPwd());
    });

    test('should call usersRepository', () => {
      expect(usersRepository.create).toBeCalledWith({
        ...userStub(),
        password: '12345678',
      });
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('findAll', () => {
    let user;

    beforeEach(async () => {
      user = await usersService.findAll();
    });

    test('should call usersRepository', () => {
      expect(usersRepository.findAll).toBeCalled();
    });

    test('should return a user', () => {
      expect(user).toEqual([userStub()]);
    });
  });

  describe('findByUsername', () => {
    let user;

    beforeEach(async () => {
      user = await usersService.findByUsername(userStub().username);
    });

    test('should call usersRepository', () => {
      expect(usersRepository.findOne).toBeCalledWith(
        { username: userStub().username },
        { password: 1 },
        { lean: true },
      );
    });

    test('should return a user', () => {
      expect(user).toEqual(undefined);
    });
  });

  describe('findById', () => {
    let user;

    beforeEach(async () => {
      user = await usersService.findById(userStub()._id);
    });

    test('should call usersRepository', () => {
      expect(usersRepository.findById).toBeCalledWith(userStub()._id);
    });

    test('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('update', () => {
    let user;

    beforeEach(async () => {
      user = await usersService.update(userStub()._id, updateUserStub());
    });

    test('should call usersRepository', () => {
      expect(usersRepository.findByIdAndUpdate).toBeCalledWith(
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
      user = await usersService.remove(userStub()._id);
    });

    test('should call usersRepository', () => {
      expect(usersRepository.findByIdAndDelete).toBeCalledWith(userStub()._id);
    });

    test('should return a user', () => {
      expect(user).toEqual({
        _id: userStub()._id,
        ...updateUserStub(),
      });
    });
  });
});
