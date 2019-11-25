import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import * as service from '../services/moviesService';
import * as mapper from '../mappers/moviesMapper';
import { getMovie, getMovies, postMovie } from './moviesController';
import { Movie } from '../models/movieModel';
import { MovieDTO, NewMovieDTO } from '../dtos/movieDTOs';

jest.mock('../services/moviesService', () => ({
  getMovie: jest.fn(),
  getMovies: jest.fn(),
  createMovie: jest.fn(),
}));

jest.mock('../mappers/moviesMapper', () => ({
  toMovie: jest.fn(),
  toMovieDTO: jest.fn(),
  toMoviesDTO: jest.fn(),
}));

const movieId = 'some id';

const movie = {
  id: 'some id',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as Movie;

const movieDTO = {
  id: 'some id',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as MovieDTO;

const newMovieDTO = {
  title: 'some title',
} as NewMovieDTO;

describe('moviesController', () => {
  describe('getMovie', () => {
    beforeEach(() => {
      (service.getMovie as jest.Mock).mockImplementationOnce(async () => movie);
      (mapper.toMovieDTO as jest.Mock).mockImplementationOnce(() => movieDTO);
    });

    it('gets movie from the service', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getMovie(req, res);

      expect(service.getMovie).toHaveBeenCalledWith(movieId);
    });

    it('throws NotFoundError if the movie is not found', async () => {
      (service.getMovie as jest.Mock).mockReset();
      (service.getMovie as jest.Mock).mockResolvedValueOnce(undefined);

      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );
      expect.assertions(1);

      try {
        await getMovie(req, res);
      } catch (e) {
        expect(e.message).toEqual('Movie "some id" does not exist');
      }
    });

    it('maps movie to DTO', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getMovie(req, res);

      expect(mapper.toMovieDTO).toHaveBeenCalledWith(movie);
    });

    it('responds with movie', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getMovie(req, res);

      expect(res.statusCode).toEqual(200);
      expect(res._getData()).toEqual(movieDTO);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe('getMovies', () => {
    beforeEach(() => {
      (service.getMovies as jest.Mock).mockImplementationOnce(async () => [movie]);
      (mapper.toMoviesDTO as jest.Mock).mockImplementationOnce(() => [movieDTO]);
    });

    it('gets movies from the service', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getMovies(req, res);

      expect(service.getMovies).toHaveBeenCalledWith();
    });

    it('maps movies to DTOs', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getMovies(req, res);

      expect(mapper.toMoviesDTO).toHaveBeenCalledWith([movie]);
    });

    it('responds with movies', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getMovies(req, res);

      expect(res.statusCode).toEqual(200);
      expect(res._getData()).toEqual([movieDTO]);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe('postMovie', () => {
    beforeEach(() => {
      (service.createMovie as jest.Mock).mockImplementationOnce(async () => movie);
      (mapper.toMovieDTO as jest.Mock).mockImplementationOnce(() => movieDTO);
    });

    it('calls create movie service with movie title', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newMovieDTO }, {});

      await postMovie(req, res);

      expect(service.createMovie).toHaveBeenCalledWith(newMovieDTO.title);
    });

    it('maps created movie to DTO', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newMovieDTO }, {});

      await postMovie(req, res);

      expect(mapper.toMovieDTO).toHaveBeenCalledWith(movie);
    });

    it('responds with the created movie', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newMovieDTO }, {});

      await postMovie(req, res);

      expect(res.statusCode).toEqual(200);
      expect(res._getData()).toEqual(movieDTO);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });
});
