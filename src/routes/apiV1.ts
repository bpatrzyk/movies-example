import express from 'express';
import { moviesRouter } from './moviesRouter';
import { commentsRouter } from './commentsRouter';

export const apiV1 = express();

apiV1.use(express.json());

apiV1.use('/movies', moviesRouter);
apiV1.use('/comments', commentsRouter);
