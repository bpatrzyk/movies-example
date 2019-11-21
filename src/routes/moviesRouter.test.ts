import { moviesRouter } from './moviesRouter';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovies, postMovie } from '../controllers/moviesController';
import { postMovieValidator } from '../validators/moviesValidator';

jest.mock('../utils/errors/asyncErrorHandler', () => ({
  asyncErrorHandler: jest.fn().mockImplementation(arg => arg),
}));
jest.mock('../controllers/moviesController', () => ({
  getMovies: function getMovies() {
  },
  postMovie: function postMovie() {
  },
}));
jest.mock('../validators/moviesValidator', () => ({
  postMovieValidator: function postMovieValidator() {
  },
}));

describe('moveisRouter', () => {
  it('should register GET movies route', () => {
    expect(moviesRouter.get).toHaveBeenCalledWith('/', asyncErrorHandler(getMovies));
  });

  it('should register POST movie route', () => {
    expect(moviesRouter.post).toHaveBeenCalledWith('/', postMovieValidator, asyncErrorHandler(postMovie));
  });
});
