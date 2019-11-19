import { Router } from 'express';

export const commentsRouter: Router = Router();

commentsRouter.get('/', (req, res) => {
  res.json({ message: 'GET Comments' });
});
commentsRouter.post('/', (req, res) => {
  res.json({ message: 'POST Comments' });
});
