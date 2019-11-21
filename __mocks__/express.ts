const expressAppMock = {
  get: jest.fn(),
  use: jest.fn(),
  listen: jest.fn(),
};

const routerMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  use: jest.fn(),
};

module.exports = jest.fn(() => expressAppMock);
module.exports.Router = jest.fn(() => routerMock);
module.exports.json = jest.fn();
module.exports.static = jest.fn();
