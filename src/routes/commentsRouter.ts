import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getComments, postComment } from '../controllers/commentsController';
import { postCommentValidator } from '../validators/commentsValidator';

export const commentsRouter: Router = Router();

commentsRouter.get('/', asyncErrorHandler(getComments));
commentsRouter.post('/', postCommentValidator, asyncErrorHandler(postComment));
