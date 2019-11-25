import * as service from './moviesService';
import * as model from '../models/movieModel';
import * as OMDBService from './omdbService';
import { toMovie } from '../mappers/moviesMapper';
import { Movie } from '../models/movieModel';
import { OMDBMovie } from './omdbService';

jest.mock('../models/movieModel', () => ({
  getMovie: jest.fn(),
  getMovies: jest.fn(),
  createMovie: jest.fn(),
  exists: jest.fn(),
}));

jest.mock('./omdbService', () => ({
  getMovie: jest.fn(),
}));

jest.mock('../mappers/moviesMapper', () => ({
  toMovie: jest.fn(),
}));

const movieId = 'some id';

const omdbMovie = {
  Title: 'some title',
  Year: '1994',
  Genre: 'Comedy',
  Country: 'US',
  Response: 'True',
} as OMDBMovie;

const movie = {
  id: 'some id',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as Movie;

const movies = [movie];

describe('moviesService', () => {
  describe('getMovie', () => {
    it('returns a single movie', async () => {
      (model.getMovie as jest.Mock).mockResolvedValueOnce(movie);

      const result = await service.getMovie(movieId);

      expect(result).toEqual(movie);
    });
  });

  describe('getMovies', () => {
    it('returns list of movies', async () => {
      (model.getMovies as jest.Mock).mockResolvedValueOnce(movies);

      const result = await service.getMovies();

      expect(result).toEqual(movies);
    });
  });

  describe('createMovie', () => {
    beforeEach(() => {
      (OMDBService.getMovie as jest.Mock).mockResolvedValueOnce(omdbMovie);
      (toMovie as jest.Mock).mockImplementation(() => movie);
    });

    it('retrieves movie data from OMDB service and store it in the database', async () => {
      (model.exists as jest.Mock).mockResolvedValueOnce(false);
      (model.createMovie as jest.Mock).mockResolvedValueOnce(movie);

      const result = await service.createMovie('some title');

      expect(model.createMovie).toHaveBeenCalledWith(movie);
      expect(result).toEqual(movie);
    });

    it('throws error if movie already exists in the database', async () => {
      (model.exists as jest.Mock).mockResolvedValueOnce(true);
      expect.assertions(1);

      try {
        await service.createMovie('some title');
      } catch (e) {
        expect(e.message).toEqual('Movie "some title" already exists');
      }
    });
  });
});
