import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserDto } from '../../dto/user.dto';

export const userStubWithPwd = (): UserDto => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    password: 'test',
    hasAdmin: false,
    username: 'test',
  };
};

export const userStub = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    hasAdmin: false,
  };
};

export const userDocumentStub = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    hasAdmin: false,
    toObject: jest.fn().mockReturnValue({
      _id: 'wqerwtyru',
      name: 'test',
      username: 'test',
      hasAdmin: false,
    }),
  };
};

export const userDocumentStubWithPwd = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    password: 'test',
    hasAdmin: false,
    toObject: jest.fn().mockReturnValue({
      _id: 'wqerwtyru',
      name: 'test',
      username: 'test',
      password: 'test',
      hasAdmin: false,
    }),
  };
};

export const updateUserStub = (): UpdateUserDto => {
  return {
    name: 'test_1',
    username: 'test',
  };
};
