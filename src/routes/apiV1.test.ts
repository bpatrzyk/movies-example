import express from 'express';
import { apiV1 } from './apiV1';
import { moviesRouter } from './moviesRouter';
import { commentsRouter } from './commentsRouter';

jest.mock('./moviesRouter', () => ({}));
jest.mock('./commentsRouter', () => ({}));

describe('apiV1', () => {
  it('should register json body parser', () => {
    expect(apiV1.use).toHaveBeenCalledWith(express.json());
  });

  it('should register movies router', () => {
    expect(apiV1.use).toHaveBeenCalledWith('/movies', moviesRouter);
  });

  it('should register comments router', () => {
    expect(apiV1.use).toHaveBeenCalledWith('/comments', commentsRouter);
  });
});
