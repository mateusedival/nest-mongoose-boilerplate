import { UpdateUserDto } from '../../dto/update-user.dto';

export const userStubWithPwd = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    token: 'xxx',
  };
};

export const userStub = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    token: 'xxx',
  };
};

export const userDocumentStub = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    token: 'xxx',
    toObject: jest.fn().mockReturnValue({
      _id: 'wqerwtyru',
      name: 'test',
      username: 'test',
      token: 'xxx',
    }),
  };
};

export const userDocumentStubWithPwd = () => {
  return {
    _id: 'wqerwtyru',
    name: 'test',
    username: 'test',
    token: 'xxx',
    toObject: jest.fn().mockReturnValue({
      _id: 'wqerwtyru',
      name: 'test',
      username: 'test',
      token: 'xxx',
    }),
  };
};

export const updateUserStub = (): UpdateUserDto => {
  return {
    name: 'test_1',
    username: 'test',
    token: 'xxx',
  };
};
