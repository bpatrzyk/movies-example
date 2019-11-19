import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';

export const commentsRouter: Router = Router();

commentsRouter.get('/', asyncErrorHandler((req, res) => {
  res.json({ message: 'GET Comments' });
}));
commentsRouter.post('/', asyncErrorHandler((req, res) => {
  res.json({ message: 'POST Comments' });
}));
