import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import { validationResult } from 'express-validator';
import { testExpressValidatorMiddleware } from '../utils/validator';
import { getMovieValidator, postMovieValidator } from './moviesValidator';

describe('moviesValidator', () => {
  describe('getMovieValidator', () => {
    it('checks if movie_id is UUID', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await testExpressValidatorMiddleware(req, res, getMovieValidator);
      const result = validationResult(req);

      expect(result.isEmpty()).toEqual(false);
      expect(result.array()).toEqual([
        {
          value: '',
          msg: 'Invalid value',
          param: 'movie_id',
          location: 'params',
        },
        {
          value: '',
          msg: 'Invalid value',
          param: 'movie_id',
          location: 'params',
        },
      ]);
    });

    it('trims the movie_id', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: '    7f59349f-5c82-4f9a-b23d-ff8e0d679652     ' } },
        {},
      );

      await testExpressValidatorMiddleware(req, res, getMovieValidator);
      const result = validationResult(req);

      expect(result.isEmpty()).toEqual(true);
      expect(result.array()).toEqual([]);
      expect(req.params).toEqual({ movie_id: '7f59349f-5c82-4f9a-b23d-ff8e0d679652' });
    });
  });

  describe('postMovieValidator', () => {
    it('checks if title is not empty', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await testExpressValidatorMiddleware(req, res, postMovieValidator);
      const result = validationResult(req);

      expect(result.isEmpty()).toEqual(false);
      expect(result.array()).toEqual([
        {
          value: undefined,
          msg: 'Invalid value',
          param: 'title',
          location: 'body',
        },
        {
          value: '',
          msg: 'Invalid value',
          param: 'title',
          location: 'body',
        },
      ]);
    });

    it('trims the title', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { body: { title: '    some title     ' } },
        {},
      );

      await testExpressValidatorMiddleware(req, res, postMovieValidator);
      const result = validationResult(req);

      expect(result.isEmpty()).toEqual(true);
      expect(result.array()).toEqual([]);
      expect(req.body).toEqual({ title: 'some title' });
    });
  });
});
