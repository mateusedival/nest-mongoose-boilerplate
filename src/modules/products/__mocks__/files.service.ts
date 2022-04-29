import { productFileStub } from '../tests/stubs/products.stub';

export const MockFilesService = jest.fn().mockReturnValue({
  uploadFile: jest.fn().mockResolvedValue({
    Location: productFileStub().url,
    Key: productFileStub().key,
  }),
  deleteFile: jest.fn().mockResolvedValue({}),
});
