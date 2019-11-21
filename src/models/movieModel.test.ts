import { db } from './db';

import { getMovies, createMovie, exists, Movie, MovieData } from './movieModel';

const movie = {
  id: 'some id',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as Movie;

const movieData = {
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as MovieData;

describe('movieModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('selects all movies from db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([movie]);
      });

      const movies = await getMovies();

      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith();
      expect(movies).toEqual([movie]);
    });
  });

  describe('createMovie', () => {
    it('creates movie in db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([movie]);
      });

      const createdMovie = await createMovie(movieData);

      expect(db).toBeCalledWith('movies');
      expect(db('movies').insert).toBeCalledWith(movieData);
      expect(db('movies').returning).toBeCalledWith('*');
      expect(createdMovie).toEqual(movie);
    });
  });

  describe('exists', () => {
    it('returns true if movie exists in the db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{}]);
      });

      const result = await exists('some movie');

      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith(1);
      expect(db('movies').where).toBeCalledWith({ title: 'some movie' });
      expect(result).toEqual(true);
    });

    it('returns false if movie does not exist in the db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([]);
      });

      const result = await exists('some movie');

      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith(1);
      expect(db('movies').where).toBeCalledWith({ title: 'some movie' });
      expect(result).toEqual(false);
    });
  });
});
