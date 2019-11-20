import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovies, postMovie } from '../controllers/moviesController';
import { postMoviesValidator } from '../validators/moviesValidator';

export const moviesRouter: Router = Router();

moviesRouter.get('/', asyncErrorHandler(getMovies));
moviesRouter.post('/', postMoviesValidator, asyncErrorHandler(postMovie));
