import { Readable } from 'stream';

export const filesStub = () => {
  return {
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: undefined,
  };
};
