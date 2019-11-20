import { checkSchema } from 'express-validator';
import { validator } from '../middlewares/validator';

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
