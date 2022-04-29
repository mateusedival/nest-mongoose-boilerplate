export const createProductStub = () => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'Test',
    description: 'Confy',
    quantity: 10,
    price: 2,
  };
};

export const productStub = () => {
  return {
    _id: '626c455e7f15293bfe1ce085',
    name: 'Test',
    description: 'Confy',
    quantity: 10,
    price: 2,
    figure: {
      mimetype: 'application/jpg',
      key: 'test.jpg',
      url: 'www.bucket/test.jpg',
    },
  };
};

export const updateProductStub = () => {
  return {
    name: 'Test 2',
    description: 'Confy',
    quantity: 10,
    price: 2,
    figure: {
      mimetype: 'application/jpg',
      key: 'test.jpg',
      url: 'www.bucket/test.jpg',
    },
  };
};

export const productFileStub = () => {
  return {
    mimetype: 'application/jpg',
    key: 'test.jpg',
    url: 'www.bucket/test.jpg',
  };
};
