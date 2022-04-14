import {
  updateUserStub,
  userDocumentStubWithPwd,
  userStub,
} from '../tests/stubs/users.stub';

export const UsersRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userDocumentStubWithPwd()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findById: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockImplementation((filter, projection, options) => {
    if ((projection.password = 1)) return undefined;
    return userStub();
  }),
  findByIdAndUpdate: jest
    .fn()
    .mockResolvedValue({ _id: userStub()._id, ...updateUserStub() }),
  findByIdAndDelete: jest
    .fn()
    .mockResolvedValue({ _id: userStub()._id, ...updateUserStub() }),
});
