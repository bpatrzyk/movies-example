import { checkSchema } from 'express-validator';
import { validator } from '../middlewares/validator';

export const getMovieValidator = [
  ...checkSchema({
    movie_id: {
      in: ['params'],
      trim: true,
      isUUID: true,
      isEmpty: {
        negated: true,
      },
    },
  }),
  validator,
];

export const postMovieValidator = [
  ...checkSchema({
    title: {
      isString: true,
      trim: true,
      isEmpty: {
        negated: true,
      },
    },
  }),
  validator,
];
