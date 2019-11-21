import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import { errorHandler } from './errorHandler';
import { ValidationError } from '../utils/errors/ValidationError';
import { ApiError } from '../utils/errors/ApiError';

describe('errorHandler middleware', () => {
  it('calls next function on response streaming errors', () => {
    const { req, res } = httpMocks.createMocks<Request, Response>({}, {});
    res.headersSent = true;
    const nextFn = jest.fn();
    const error = new Error('msg');
    errorHandler(error, req, res, nextFn);
    expect(nextFn).toHaveBeenCalledWith(error);
  });

  it('handles ValidationError', () => {
    const { req, res } = httpMocks.createMocks<Request, Response>({}, {});
    const nextFn = jest.fn();
    const error = new ValidationError('msg', [{
      value: undefined,
      msg: 'Invalid value',
      param: 'movieId',
      location: 'body',
    }]);
    errorHandler(error, req, res, nextFn);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toEqual({
      message: 'msg',
      errors: [{
        value: undefined,
        msg: 'Invalid value',
        param: 'movieId',
        location: 'body',
      }],
    });
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('handles ApiError', () => {
    const { req, res } = httpMocks.createMocks<Request, Response>({}, {});
    const nextFn = jest.fn();
    const error = new ApiError(418, 'I\'m a Teapot');
    errorHandler(error, req, res, nextFn);
    expect(res.statusCode).toEqual(418);
    expect(res._getJSONData()).toEqual({
      message: 'I\'m a Teapot',
    });
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('handles SyntaxError', () => {
    const { req, res } = httpMocks.createMocks<Request, Response>({}, {});
    const nextFn = jest.fn();
    const error = new SyntaxError('msg');
    errorHandler(error, req, res, nextFn);
    expect(res.statusCode).toEqual(400);
    expect(res._getJSONData()).toEqual({
      message: 'msg',
    });
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('handles Error with generic message', () => {
    const { req, res } = httpMocks.createMocks<Request, Response>({}, {});
    const nextFn = jest.fn();
    const error = new Error('msg');
    errorHandler(error, req, res, nextFn);
    expect(res.statusCode).toEqual(500);
    expect(res._getJSONData()).toEqual({
      message: 'Internal server error',
    });
    expect(res._isEndCalled()).toBeTruthy();
  });
});
