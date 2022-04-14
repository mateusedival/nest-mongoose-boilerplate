import { updateUserStub, userStub } from '../tests/stubs/users.stub';

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findById: jest.fn().mockResolvedValue(userStub()),
  update: jest
    .fn()
    .mockResolvedValue({ _id: userStub()._id, ...updateUserStub() }),
  remove: jest
    .fn()
    .mockResolvedValue({ _id: userStub()._id, ...updateUserStub() }),
});
