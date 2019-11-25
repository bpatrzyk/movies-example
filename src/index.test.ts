import { config as dotenv } from 'dotenv';
import express from 'express';
import { apiV1 } from './routes/apiV1';
import { swaggerRouter } from './routes/swaggerRouter';
import { errorHandler } from './middlewares/errorHandler';
import { errorLogMiddleware, logMiddleware } from './middlewares/logger';
import './index';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('./routes/apiV1', () => ({}));
jest.mock('./routes/swaggerRouter', () => ({}));
jest.mock('./middlewares/errorHandler', () => ({}));
jest.mock('./utils/logger', () => ({}));
jest.mock('./middlewares/logger', () => ({}));

describe('App', () => {
  it('loads dotenv config', () => {
    expect(dotenv).toHaveBeenCalledWith();
  });

  describe('express', () => {
    it('uses api v1 routes', () => {
      expect(express().use).toHaveBeenCalledWith('/api/v1', apiV1);
    });

    it('uses swagger routes', () => {
      expect(express().use).toHaveBeenCalledWith('/', swaggerRouter);
    });

    it('uses logging middleware', () => {
      expect(express().use).toHaveBeenCalledWith(logMiddleware);
      expect(express().use).toHaveBeenCalledWith(errorLogMiddleware);
    });

    it('uses error handler middleware', () => {
      expect(express().use).toHaveBeenCalledWith(errorHandler);
    });

    it('starts the server on the specified port', () => {
      expect(express().listen).toHaveBeenCalledWith('3000', expect.any(Function));
    });
  });
});
