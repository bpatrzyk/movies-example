import { checkSchema } from 'express-validator';
import { validator } from '../middlewares/validator';

export const postCommentValidator = [
  ...checkSchema({
    movieId: {
      isString: true,
      trim: true,
      isEmpty: {
        negated: true,
      },
    },
    comment: {
      isString: true,
      trim: true,
      isEmpty: {
        negated: true,
      },
    },
    username: {
      isString: true,
      trim: true,
      isEmpty: {
        negated: true,
      },
    },
  }),
  validator,
];
