import { moviesRouter } from './moviesRouter';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovies, postMovie } from '../controllers/moviesController';
import { postMovieValidator } from '../validators/moviesValidator';

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
