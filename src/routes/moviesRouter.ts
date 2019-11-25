import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovie, getMovies, postMovie } from '../controllers/moviesController';
import { getMovieValidator, postMovieValidator } from '../validators/moviesValidator';

export const moviesRouter: Router = Router();

moviesRouter.get('/:movie_id', getMovieValidator, asyncErrorHandler(getMovie));
moviesRouter.get('/', asyncErrorHandler(getMovies));
moviesRouter.post('/', postMovieValidator, asyncErrorHandler(postMovie));
