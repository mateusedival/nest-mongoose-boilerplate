import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserDto } from '../../dto/user.dto';

export const userStubWithPwd = (): UserDto => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'test',
    password: 'test',
    username: 'test',
  };
};

export const userStub = () => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'test',
    username: 'test',
  };
};

export const userDocumentStub = () => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'test',
    username: 'test',
    toObject: jest.fn().mockReturnValue({
      _id: '626c455e7f15293bfe1ce085',
      name: 'test',
      username: 'test',
    }),
  };
};

export const userDocumentStubWithPwd = () => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'test',
    username: 'test',
    password: 'test',
    toObject: jest.fn().mockReturnValue({
      _id: '626c455e7f15293bfe1ce085',
      name: 'test',
      username: 'test',
      password: 'test',
    }),
  };
};

export const updateUserStub = (): UpdateUserDto => {
  return {
    name: 'test_1',
    username: 'test',
  };
};
