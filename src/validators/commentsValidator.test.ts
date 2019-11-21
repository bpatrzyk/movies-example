import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import { validationResult } from 'express-validator';
import { testExpressValidatorMiddleware } from '../utils/validator';
import { postCommentValidator } from './commentsValidator';

describe('commentsValidator', () => {
  describe('movieId validation', () => {
    it('checks if movieId is not empty', async () => {
      const body = {
        comment: 'some comment',
        username: 'user123',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([
        {
          value: undefined,
          msg: 'Invalid value',
          param: 'movieId',
          location: 'body',
        },
        {
          value: '',
          msg: 'Invalid value',
          param: 'movieId',
          location: 'body',
        },
      ]);
    });

    it('trims the movieId', async () => {
      const body = {
        movieId: '     some id   ',
        comment: 'some comment',
        username: 'user123',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([]);
      expect(req.body).toEqual({
        movieId: 'some id',
        comment: 'some comment',
        username: 'user123',
      });
    });
  });

  describe('comment validation', () => {
    it('checks if comment is not empty', async () => {
      const body = {
        movieId: 'some id',
        username: 'user123',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([
        {
          value: undefined,
          msg: 'Invalid value',
          param: 'comment',
          location: 'body',
        },
        {
          value: '',
          msg: 'Invalid value',
          param: 'comment',
          location: 'body',
        },
      ]);
    });

    it('trims the username', async () => {
      const body = {
        movieId: 'some id',
        comment: '    some comment   ',
        username: 'user123',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([]);
      expect(req.body).toEqual({
        movieId: 'some id',
        comment: 'some comment',
        username: 'user123',
      });
    });
  });

  describe('username validation', () => {
    it('checks if username is not empty', async () => {
      const body = {
        movieId: 'some id',
        comment: 'some comment',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([
        {
          value: undefined,
          msg: 'Invalid value',
          param: 'username',
          location: 'body',
        },
        {
          value: '',
          msg: 'Invalid value',
          param: 'username',
          location: 'body',
        },
      ]);
    });

    it('trims the username', async () => {
      const body = {
        movieId: 'some id',
        comment: 'some comment',
        username: '    user123   ',
      };
      const { req, res } = httpMocks.createMocks<Request, Response>({ body }, {});
      await testExpressValidatorMiddleware(req, res, postCommentValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([]);
      expect(req.body).toEqual({
        movieId: 'some id',
        comment: 'some comment',
        username: 'user123',
      });
    });
  });
});
