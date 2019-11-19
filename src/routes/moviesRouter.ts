import { Router } from 'express';

export const moviesRouter: Router = Router();

moviesRouter.get('/', (req, res) => {
  res.json({ message: 'GET Movies' });
});
moviesRouter.post('/', (req, res) => {
  res.json({ message: 'POST Movies' });
});
