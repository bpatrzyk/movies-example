import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovies, postMovie } from '../controllers/moviesController';
import { postMovieValidator } from '../validators/moviesValidator';

export const moviesRouter: Router = Router();

moviesRouter.get('/', asyncErrorHandler(getMovies));
moviesRouter.post('/', postMovieValidator, asyncErrorHandler(postMovie));
