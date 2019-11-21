import { validator } from './validator';
import { validationResult } from 'express-validator';
import httpMocks from 'node-mocks-http';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('validator middleware', () => {
  it('throws ValidationErrors if validation failed', () => {
    expect.assertions(2);
    (validationResult as unknown as jest.Mock).mockImplementationOnce(() => ({
      isEmpty: () => {
        return false;
      },
      array: () => {
        return ['error 1'];
      },
    }));
    const { req, res } = httpMocks.createMocks({}, {});
    const nextFn = jest.fn();
    try {
      validator(req, res, nextFn);
    } catch (e) {
      expect(e.message).toEqual('Validation error');
      expect(e.errors).toEqual(['error 1']);
    }
  });

  it('calls next function if validation passed', () => {
    (validationResult as unknown as jest.Mock).mockImplementationOnce(() => ({
      isEmpty: () => {
        return true;
      },
    }));
    const { req, res } = httpMocks.createMocks({}, {});
    const nextFn = jest.fn();
    validator(req, res, nextFn);
    expect(nextFn).toHaveBeenCalledWith();
  });
});
