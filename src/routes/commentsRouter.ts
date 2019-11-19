import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getComments, postComment } from '../controllers/commentsController';

export const commentsRouter: Router = Router();

commentsRouter.get('/', asyncErrorHandler(getComments));
commentsRouter.post('/', asyncErrorHandler(postComment));
