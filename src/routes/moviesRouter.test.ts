import { moviesRouter } from './moviesRouter';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovie, getMovies, postMovie } from '../controllers/moviesController';
import { getCommentsForMovie } from '../controllers/commentsController';
import { getMovieValidator, postMovieValidator } from '../validators/moviesValidator';

jest.mock('../utils/errors/asyncErrorHandler', () => ({
  asyncErrorHandler: jest.fn().mockImplementation(arg => arg),
}));
jest.mock('../controllers/moviesController', () => ({
  getMovies: jest.fn(),
  postMovie: jest.fn(),
}));
jest.mock('../validators/moviesValidator', () => ({
  postMovieValidator: jest.fn(),
}));

describe('moveisRouter', () => {
  it('should register GET movie route', () => {
    expect(moviesRouter.get).toHaveBeenCalledWith(
      '/:movie_id',
      getMovieValidator,
      asyncErrorHandler(getMovie),
    );
  });

  it('should register GET comments for movie route', () => {
    expect(moviesRouter.get).toHaveBeenCalledWith(
      '/:movie_id/comments',
      getMovieValidator,
      asyncErrorHandler(getCommentsForMovie),
    );
  });

  it('should register GET movies route', () => {
    expect(moviesRouter.get).toHaveBeenCalledWith('/', asyncErrorHandler(getMovies));
  });

  it('should register POST movie route', () => {
    expect(moviesRouter.post).toHaveBeenCalledWith(
      '/',
      postMovieValidator,
      asyncErrorHandler(postMovie),
    );
  });
});
