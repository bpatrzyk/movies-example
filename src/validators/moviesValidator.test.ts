import httpMocks from 'node-mocks-http';
import { validationResult } from 'express-validator';
import { testExpressValidatorMiddleware } from '../utils/validator';
import { postMovieValidator } from './moviesValidator';

describe('moviesValidator', () => {
  describe('title validation', () => {
    it('checks if title is not empty', async () => {
      const { req, res } = httpMocks.createMocks({}, {});
      await testExpressValidatorMiddleware(req, res, postMovieValidator);
      const result = validationResult(req);
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
      const { req, res } = httpMocks.createMocks({ body: { title: '    some title     ' } }, {});
      await testExpressValidatorMiddleware(req, res, postMovieValidator);
      const result = validationResult(req);
      expect(result.array()).toEqual([]);
      expect(req.body).toEqual({ title: 'some title' });
    });
  });
});
