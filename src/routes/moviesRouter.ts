import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';

export const moviesRouter: Router = Router();

moviesRouter.get('/', asyncErrorHandler((req, res) => {
  res.json({ message: 'GET Movies' });
}));
moviesRouter.post('/', asyncErrorHandler((req, res) => {
  res.json({ message: 'POST Movies' });
}));
