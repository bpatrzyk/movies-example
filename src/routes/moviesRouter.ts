import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovies, postMovie } from '../controllers/moviesController';

export const moviesRouter: Router = Router();

moviesRouter.get('/', asyncErrorHandler(getMovies));
moviesRouter.post('/', asyncErrorHandler(postMovie));
